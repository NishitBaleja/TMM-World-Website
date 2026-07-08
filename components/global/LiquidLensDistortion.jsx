"use client";
import React, { useRef, useEffect, useState } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Texture, Plane, Vec2 } from "ogl";
import gsap from "@/lib/gsap";

export default function LiquidLensDistortion({
  children,
  lensRadius = 180,                // Lens radius in pixels
  maxDistort = 40,                 // Maximum displacement in pixels
  strength = 3,                   // Base distortion displacement in pixels
  falloff = 2.5,                   // Easing power for lens radial falloff
  lerpAmount = 0.08,               // Smoothing/lag factor (lower = smoother lag)
  velocityMultiplier = 0.15,       // Multiplier for mouse velocity scaling
  chromaticAberrationStrength = 1.0, // Chromatic aberration scale in pixels
  noiseStrength = 10.0,             // Faint noise pattern intensity in pixels
  companyMode = false,             // Use company page backgrounds with direct opacity
  projectsMode = false,            // Use projects page background with direct opacity
  dynamicBg = null,                // Dynamic background image url for project detail page
  solidBlackBg = false,            // Render solid black background
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);

  // Refs for tracking hovered HTML elements and their scales smoothly
  const hoveredTextRef = useRef(null);
  const hoveredImageRef = useRef(null);
  const lastHoveredTextRef = useRef(null);
  const lastHoveredImageRef = useRef(null);

  const currentTextScaleRef = useRef(0);
  const targetTextScaleRef = useRef(0);
  const currentImageScaleRef = useRef(0);
  const targetImageScaleRef = useRef(0);

  // Refs for tracking active GSAP turbulence tweens to play/pause dynamically
  const turbTextTweenRef = useRef(null);
  const turbImageTweenRef = useRef(null);

  // Refs for tracking cached document-relative positions to avoid getBoundingClientRect layout thrashing in RAF loop
  const hoveredTextPosRef = useRef({ docLeft: 0, docTop: 0 });
  const hoveredImagePosRef = useRef({ docLeft: 0, docTop: 0 });

  useEffect(() => {
    // Check capability and preference
    const isHoverable = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isHoverable || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Initialize OGL Renderer
    let renderer, gl;
    try {
      renderer = new Renderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio, 2)
      });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to standard DOM rendering:", e);
      setIsEnabled(false);
      return;
    }

    // Set WebGL Active Class on HTML node to trigger fallback CSS hiding rules for DOM bg
    document.documentElement.classList.add("webgl-active");

    const scene = new Transform();

    // Set up orthographic camera matching window screen pixels
    const camera = new Camera(gl);
    camera.position.z = 5;
    camera.type = "orthographic";

    const updateCamera = () => {
      camera.orthographic({
        left: -width / 2,
        right: width / 2,
        top: height / 2,
        bottom: -height / 2,
        near: 0.1,
        far: 10
      });
    };
    updateCamera();

    // Helper: Create a 1x1 transparent canvas texture placeholder
    const createPlaceholderTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 1;
      pCanvas.height = 1;
      return new Texture(gl, {
        image: pCanvas,
        generateMipmaps: false,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR
      });
    };

    // --- Background Quad Layer ---
    const bgGeometry = new Plane(gl);
    const bgHeroTex = createPlaceholderTexture();
    const bgPhiloTex = createPlaceholderTexture();
    const bgProjTex = createPlaceholderTexture();
    const bgCompTex = createPlaceholderTexture();

    const bgUniforms = {
      uHeroTex: { value: bgHeroTex },
      uPhiloTex: { value: bgPhiloTex },
      uProjTex: { value: bgProjTex },
      uCompTex: { value: bgCompTex },
      uHeroAspect: { value: 1.5 },
      uPhiloAspect: { value: 1.5 },
      uProjAspect: { value: 1.5 },
      uCompAspect: { value: 1.5 },
      uViewportAspect: { value: width / height },
      uFadeHeroToPhilo: { value: 0 },
      uFadePhiloToProj: { value: 0 },
      uFadeProjToComp: { value: 0 },
      uFadeCompToFooter: { value: 0 },
      uBgYOffset: { value: 0 },
      uMouse: { value: new Vec2(-9999, -9999) },
      uResolution: { value: new Vec2(width, height) },
      uRadius: { value: lensRadius },
      uStrength: { value: strength },
      uTime: { value: 0 },
      uChromaticAberration: { value: chromaticAberrationStrength },
      uNoiseStrength: { value: noiseStrength },
      uCompanyMode: { value: (companyMode || projectsMode) ? 1.0 : 0.0 },
      uBg1Opacity: { value: (companyMode || projectsMode) ? 0.99 : 0.0 },
      uBg2Opacity: { value: 0.0 },
      uSolidBlack: { value: solidBlackBg ? 1.0 : 0.0 },
      uMapXOffset: { value: window.innerWidth < 768 ? 0.25 : 0.0 }
    };

    const bgVertexShader = `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const bgFragmentShader = `
      precision highp float;
      uniform sampler2D uHeroTex;
      uniform sampler2D uPhiloTex;
      uniform sampler2D uProjTex;
      uniform sampler2D uCompTex;

      uniform float uHeroAspect;
      uniform float uPhiloAspect;
      uniform float uProjAspect;
      uniform float uCompAspect;
      uniform float uViewportAspect;

      uniform float uFadeHeroToPhilo;
      uniform float uFadePhiloToProj;
      uniform float uFadeProjToComp;
      uniform float uFadeCompToFooter;

      uniform float uBgYOffset;

      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uTime;
      uniform float uChromaticAberration;
      uniform float uNoiseStrength;
      uniform float uCompanyMode;
      uniform float uBg1Opacity;
      uniform float uBg2Opacity;
      uniform float uSolidBlack;
      uniform float uMapXOffset;

      varying vec2 vUv;

      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 fp = fract(p);
        fp = fp * fp * (3.0 - 2.0 * fp);
        float val = mix(
          mix(rand(ip), rand(ip + vec2(1.0, 0.0)), fp.x),
          mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), fp.x),
          fp.y
        );
        return val * 2.0 - 1.0;
      }

      vec2 getCoverUv(vec2 uv, float imgAspect, float screenAspect, float yOffset, float zoomScale) {
        vec2 shiftedUv = uv;
        shiftedUv.y += yOffset;
        
        vec2 ratio = vec2(
          min(screenAspect / imgAspect, 1.0),
          min(imgAspect / screenAspect, 1.0)
        );
        return (shiftedUv - 0.5) * ratio * zoomScale + 0.5;
      }

      vec2 getBottomUv(vec2 uv, float imgAspect, float screenAspect, float yOffset, float zoomScale, float xOffset) {
        vec2 shiftedUv = uv;
        shiftedUv.y += (yOffset + 0.05) * 0.25;
        shiftedUv.x += xOffset;
        
        vec2 ratio = vec2(
          min(screenAspect / imgAspect, 1.0),
          min(imgAspect / screenAspect, 1.0)
        );
        
        vec2 res;
        res.x = (shiftedUv.x - 0.5) * ratio.x * zoomScale + 0.5;
        res.y = shiftedUv.y * ratio.y * zoomScale;
        return res;
      }

      vec4 sampleTex(sampler2D tex, vec2 uv) {
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
          return vec4(0.0, 0.0, 0.0, 1.0);
        }
        return texture2D(tex, uv);
      }

      void main() {
        if (uSolidBlack > 0.5) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        vec2 fragCoord = vUv * uResolution;
        vec2 mouseCoord = uMouse * uResolution;
        
        vec2 pixelDiff = fragCoord - mouseCoord;
        float dist = length(pixelDiff);

        vec2 finalUv = vUv;

        if (dist < uRadius) {
          float refractPower = pow(1.0 - (dist / uRadius), 2.5);
          vec2 dispInPixels = -normalize(pixelDiff) * refractPower * uStrength;
          
          float timeScale = uTime * 1.5;
          float nVal = noise(vUv * 35.0 + vec2(timeScale, -timeScale));
          dispInPixels += vec2(nVal, -nVal) * uNoiseStrength * refractPower;
          
          finalUv += dispInPixels / uResolution;
        }

        vec2 uvHero = getCoverUv(finalUv, uHeroAspect, uViewportAspect, uBgYOffset, 0.85);
        vec2 uvPhilo = (uCompanyMode > 0.5)
          ? getBottomUv(finalUv, uPhiloAspect, uViewportAspect, uBgYOffset, 1.35, uMapXOffset)
          : getCoverUv(finalUv, uPhiloAspect, uViewportAspect, uBgYOffset, 0.85);
        vec2 uvProj = getCoverUv(finalUv, uProjAspect, uViewportAspect, uBgYOffset, 0.85);
        vec2 uvComp = getCoverUv(finalUv, uCompAspect, uViewportAspect, uBgYOffset, 0.85);

        vec4 colHero, colPhilo, colProj, colComp;

        if (dist < uRadius) {
          float refractPower = pow(1.0 - (dist / uRadius), 2.5);
          vec2 caDisp = -normalize(pixelDiff) * uChromaticAberration * refractPower / uResolution;

          vec2 uvHeroR = getCoverUv(finalUv + caDisp, uHeroAspect, uViewportAspect, uBgYOffset, 0.85);
          vec2 uvHeroB = getCoverUv(finalUv - caDisp, uHeroAspect, uViewportAspect, uBgYOffset, 0.85);
          colHero = vec4(sampleTex(uHeroTex, uvHeroR).r, sampleTex(uHeroTex, uvHero).g, sampleTex(uHeroTex, uvHeroB).b, sampleTex(uHeroTex, uvHero).a);

          vec2 uvPhiloR = (uCompanyMode > 0.5)
            ? getBottomUv(finalUv + caDisp, uPhiloAspect, uViewportAspect, uBgYOffset, 1.35, uMapXOffset)
            : getCoverUv(finalUv + caDisp, uPhiloAspect, uViewportAspect, uBgYOffset, 0.85);
          vec2 uvPhiloB = (uCompanyMode > 0.5)
            ? getBottomUv(finalUv - caDisp, uPhiloAspect, uViewportAspect, uBgYOffset, 1.35, uMapXOffset)
            : getCoverUv(finalUv - caDisp, uPhiloAspect, uViewportAspect, uBgYOffset, 0.85);
          colPhilo = vec4(sampleTex(uPhiloTex, uvPhiloR).r, sampleTex(uPhiloTex, uvPhilo).g, sampleTex(uPhiloTex, uvPhiloB).b, sampleTex(uPhiloTex, uvPhilo).a);

          vec2 uvProjR = getCoverUv(finalUv + caDisp, uProjAspect, uViewportAspect, uBgYOffset, 0.85);
          vec2 uvProjB = getCoverUv(finalUv - caDisp, uProjAspect, uViewportAspect, uBgYOffset, 0.85);
          colProj = vec4(sampleTex(uProjTex, uvProjR).r, sampleTex(uProjTex, uvProj).g, sampleTex(uProjTex, uvProjB).b, sampleTex(uProjTex, uvProj).a);

          vec2 uvCompR = getCoverUv(finalUv + caDisp, uCompAspect, uViewportAspect, uBgYOffset, 0.85);
          vec2 uvCompB = getCoverUv(finalUv - caDisp, uCompAspect, uViewportAspect, uBgYOffset, 0.85);
          colComp = vec4(sampleTex(uCompTex, uvCompR).r, sampleTex(uCompTex, uvComp).g, sampleTex(uCompTex, uvCompB).b, sampleTex(uCompTex, uvComp).a);
        } else {
          colHero = sampleTex(uHeroTex, uvHero);
          colPhilo = sampleTex(uPhiloTex, uvPhilo);
          colProj = sampleTex(uProjTex, uvProj);
          colComp = sampleTex(uCompTex, uvComp);
        }

        vec4 finalCol = vec4(0.0, 0.0, 0.0, 1.0);

        if (uCompanyMode > 0.5) {
          // Company page: use direct opacity values for BG1 (hero slot) and BG2 (philo slot)
          finalCol = mix(finalCol, colHero, uBg1Opacity);
          finalCol = mix(finalCol, colPhilo, uBg2Opacity);
        } else {
          // Home page: compute opacity from scroll fade transitions
          float heroOpacity = 0.99 * clamp((0.4 - uFadeHeroToPhilo) / 0.4, 0.0, 1.0);
          float philoOpacity = 0.99 * clamp((uFadeHeroToPhilo - 0.6) / 0.4, 0.0, 1.0) * clamp((0.4 - uFadePhiloToProj) / 0.4, 0.0, 1.0);
          float projOpacity = 0.99 * clamp((uFadePhiloToProj - 0.6) / 0.4, 0.0, 1.0) * clamp((0.4 - uFadeProjToComp) / 0.4, 0.0, 1.0);
          float compOpacity = 0.99 * clamp((uFadeProjToComp - 0.6) / 0.4, 0.0, 1.0) * clamp((0.4 - uFadeCompToFooter) / 0.4, 0.0, 1.0);
          finalCol = mix(finalCol, colHero, heroOpacity);
          finalCol = mix(finalCol, colPhilo, philoOpacity);
          finalCol = mix(finalCol, colProj, projOpacity);
          finalCol = mix(finalCol, colComp, compOpacity);
        }

        finalCol.rgb = mix(finalCol.rgb, vec3(0.0), 0.34);

        gl_FragColor = finalCol;
      }
    `;

    let bgProgram;
    try {
      bgProgram = new Program(gl, {
        vertex: bgVertexShader,
        fragment: bgFragmentShader,
        uniforms: bgUniforms,
        depthTest: false,
        depthWrite: false
      });
      if (!bgProgram.uniformLocations) {
        const vsLog = gl.getShaderInfoLog(bgProgram.vertexShader);
        const fsLog = gl.getShaderInfoLog(bgProgram.fragmentShader);
        const programLog = gl.getProgramInfoLog(bgProgram.program);
        const errorMsg = `Shader Link Failure:\nProgram Log: ${programLog}\nVS Log: ${vsLog}\nFS Log: ${fsLog}`;
        console.error(errorMsg);
        const errDiv = document.createElement('div');
        errDiv.style.cssText = 'position:fixed;top:0;left:0;z-index:99999;background:red;color:white;padding:20px;font-family:monospace;white-space:pre-wrap;width:100%;height:100%;overflow:auto;';
        errDiv.textContent = errorMsg;
        document.body.appendChild(errDiv);
      }
    } catch (e) {
      console.error("Program creation crashed:", e);
    }

    const bgMesh = new Mesh(gl, { geometry: bgGeometry, program: bgProgram });
    bgMesh.scale.set(width, height, 1);
    bgMesh.setParent(scene);

    // Loader helper for background textures
    const loadBgTexture = (url, aspectUniform, textureObj) => {
      const img = new Image();
      // Same-origin local assets do not need crossOrigin configuration
      img.onload = () => {
        aspectUniform.value = img.naturalWidth / img.naturalHeight;
        textureObj.image = img;
        textureObj.needsUpdate = true;
      };
      img.src = url;
    };

    if (solidBlackBg) {
      // Do not load any background textures
    } else if (projectsMode) {
      // Projects or Project Detail page: load matching background image into hero texture slot
      const bgUrl = dynamicBg || "/images/home/philosophy-bg-img.webp";
      loadBgTexture(bgUrl, bgUniforms.uHeroAspect, bgHeroTex);
    } else if (companyMode) {
      // Company page: load company backgrounds into hero and philo texture slots
      loadBgTexture("/images/home/hero-bg-img.webp", bgUniforms.uHeroAspect, bgHeroTex);
      loadBgTexture("/images/company/map-bg-img.webp", bgUniforms.uPhiloAspect, bgPhiloTex);
    } else {
      // Home page: load all 4 section backgrounds
      loadBgTexture("/images/home/hero-bg-img.webp", bgUniforms.uHeroAspect, bgHeroTex);
      loadBgTexture("/images/home/philosophy-bg-img.webp", bgUniforms.uPhiloAspect, bgPhiloTex);
      loadBgTexture("/images/home/projects-bg-img.webp", bgUniforms.uProjAspect, bgProjTex);
      loadBgTexture("/images/home/company-bg-img.webp", bgUniforms.uCompAspect, bgCompTex);
    }

    // SVG filter elements references
    const maskText = document.getElementById("svg-mask-text");
    const dispText = document.getElementById("svg-disp-text");
    const maskImage = document.getElementById("svg-mask-image");
    const dispImage = document.getElementById("svg-disp-image");

    // --- Event Listeners and Spring Lag Cursor Processing ---
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;
    let currentVelocity = 0;

    let lastTime = performance.now();

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - (e.clientY / window.innerHeight);

      if (currentMouseX < -9000) {
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
      }
    };

    const handleMouseOver = (e) => {
      let target;
      if (e.target.closest("header") || e.target.closest(".navbar-menu-overlay")) {
        // Use elementsFromPoint to detect distortion targets beneath the fixed navbar
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        for (const el of elements) {
          const candidate = el.closest(".webgl-distort-text, .webgl-distort-image");
          if (candidate) { target = candidate; break; }
        }
        if (!target) {
          hoveredTextRef.current = null;
          targetTextScaleRef.current = 0;
          hoveredImageRef.current = null;
          targetImageScaleRef.current = 0;
          return;
        }
      } else {
        target = e.target.closest(".webgl-distort-text, .webgl-distort-image");
      }
      if (target) {
        if (target.classList.contains("webgl-distort-text")) {
          document.querySelectorAll(".webgl-distort-text").forEach((el) => {
            if (el !== target) el.classList.remove("is-distorted");
          });
          hoveredTextRef.current = target;
          lastHoveredTextRef.current = target;
          targetTextScaleRef.current = 75;
          target.classList.add("is-distorted");

          // Cache position relative to document to avoid getBoundingClientRect in loop
          const rect = target.getBoundingClientRect();
          hoveredTextPosRef.current = {
            docLeft: rect.left + window.scrollX,
            docTop: rect.top + window.scrollY
          };
        } else if (target.classList.contains("webgl-distort-image")) {
          document.querySelectorAll(".webgl-distort-image").forEach((el) => {
            if (el !== target) el.classList.remove("is-distorted");
          });
          hoveredImageRef.current = target;
          lastHoveredImageRef.current = target;
          targetImageScaleRef.current = 30;
          target.classList.add("is-distorted");

          // Cache position relative to document to avoid getBoundingClientRect in loop
          const rect = target.getBoundingClientRect();
          hoveredImagePosRef.current = {
            docLeft: rect.left + window.scrollX,
            docTop: rect.top + window.scrollY
          };
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(".webgl-distort-text, .webgl-distort-image");
      if (target) {
        if (e.relatedTarget && target.contains(e.relatedTarget)) {
          return;
        }
        if (target.classList.contains("webgl-distort-text")) {
          if (hoveredTextRef.current === target) {
            hoveredTextRef.current = null;
          }
          targetTextScaleRef.current = 0;
        } else if (target.classList.contains("webgl-distort-image")) {
          if (hoveredImageRef.current === target) {
            hoveredImageRef.current = null;
          }
          targetImageScaleRef.current = 0;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    // Handle Window Resize events
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      renderer.setSize(width, height);
      updateCamera();

      bgUniforms.uViewportAspect.value = width / height;
      bgUniforms.uResolution.value.set(width, height);
      bgUniforms.uMapXOffset.value = width < 768 ? 0.25 : 0.0;
      bgMesh.scale.set(width, height, 1);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Handle Visibility change to pause loop when tab is hidden
    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    // Render loop
    let animationFrameId;
    const loop = (now) => {
      animationFrameId = requestAnimationFrame(loop);

      if (!isTabActive || !bgProgram || !bgProgram.uniformLocations) return;

      const dt = now - lastTime;
      lastTime = now;

        // Interpolate mouse coordinates (velocity-adaptive lerp)
        if (targetMouseX > -9000) {
          const dx = targetMouseX - currentMouseX;
          const dy = targetMouseY - currentMouseY;

          const velocity = Math.sqrt(dx * dx + dy * dy);
          currentVelocity += (velocity - currentVelocity) * 0.15;

          const dynamicLerp = Math.min(lerpAmount + currentVelocity * 1.5, 0.5);
          currentMouseX += dx * dynamicLerp;
          currentMouseY += dy * dynamicLerp;
        }

      if (projectsMode) {
        // Projects or Project Detail page: read opacity from DOM background layer
        const projBgEl = document.querySelector(".expertise-bg-layer") || document.querySelector(".projects-bg-layer") || document.querySelector(".project-detail-bg-layer");
        if (projBgEl) {
          const inlineOp = parseFloat(projBgEl.style.opacity);
          bgUniforms.uBg1Opacity.value = isNaN(inlineOp) ? 0.99 : inlineOp;
        }
      } else if (companyMode) {
        // Company page: read inline opacity from DOM background layers (which GSAP animates directly)
        const bg1El = document.querySelector(".company-bg-page-1");
        const bg2El = document.querySelector(".company-bg-page-2");
        if (bg1El) {
          const inlineOp = parseFloat(bg1El.style.opacity);
          bgUniforms.uBg1Opacity.value = isNaN(inlineOp) ? 0.99 : inlineOp;
        }
        if (bg2El) {
          const inlineOp = parseFloat(bg2El.style.opacity);
          bgUniforms.uBg2Opacity.value = isNaN(inlineOp) ? 0.0 : inlineOp;
        }
      } else {
        // Home page: read fade transitions from main background CSS custom properties
        const bgEl = document.getElementById("main-background");
        if (bgEl) {
          const bgStyle = window.getComputedStyle(bgEl);
          bgUniforms.uFadeHeroToPhilo.value = parseFloat(bgStyle.getPropertyValue("--fade-hero-to-philosophy") || "0");
          bgUniforms.uFadePhiloToProj.value = parseFloat(bgStyle.getPropertyValue("--fade-philosophy-to-projects") || "0");
          bgUniforms.uFadeProjToComp.value = parseFloat(bgStyle.getPropertyValue("--fade-projects-to-company") || "0");
          bgUniforms.uFadeCompToFooter.value = parseFloat(bgStyle.getPropertyValue("--fade-company-to-footer") || "0");
        }
      }

      // Parse current scroll percentage and apply vertical parallax offset
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollPercent = window.scrollY / maxScroll;
      bgUniforms.uBgYOffset.value = -0.05 + 0.10 * scrollPercent;

      // Update shader uniforms
      bgUniforms.uTime.value = now * 0.001;
      bgUniforms.uMouse.value.set(currentMouseX, currentMouseY);

      // Dynamically scale lens radius & strength based on current cursor velocity
      const dynamicRadius = lensRadius + currentVelocity * width * velocityMultiplier;
      const dynamicStrength = strength + currentVelocity * width * (velocityMultiplier * 0.6);
      bgUniforms.uRadius.value = Math.min(dynamicRadius, lensRadius * 2.2);
      bgUniforms.uStrength.value = Math.min(dynamicStrength, maxDistort);

      // --- Smooth Foreground SVG Distortion Update ---
      const scaleLerp = 0.08;

      // 1. Text filter update
      currentTextScaleRef.current += (targetTextScaleRef.current - currentTextScaleRef.current) * scaleLerp;
      const activeText = hoveredTextRef.current || lastHoveredTextRef.current;
      if (activeText && currentTextScaleRef.current > 0.01) {
        const screenX = currentMouseX * width;
        const screenY = (1.0 - currentMouseY) * height;
        const localX = (screenX + window.scrollX) - hoveredTextPosRef.current.docLeft;
        const localY = (screenY + window.scrollY) - hoveredTextPosRef.current.docTop;

        const radiusText = Math.round(lensRadius * 3.5) / 2;
        if (maskText) {
          maskText.setAttribute("x", (localX - radiusText).toFixed(1));
          maskText.setAttribute("y", (localY - radiusText).toFixed(1));
        }
        if (dispText) {
          const textBaseScale = targetTextScaleRef.current;
          if (textBaseScale > 0) {
            const dynamicTextScale = textBaseScale + currentVelocity * width * 0.15;
            const textScaleVal = Math.min(dynamicTextScale, textBaseScale * 1.5) * (currentTextScaleRef.current / textBaseScale);
            dispText.setAttribute("scale", textScaleVal.toFixed(1));
          } else {
            dispText.setAttribute("scale", currentTextScaleRef.current.toFixed(1));
          }
        }
      } else {
        if (dispText) {
          dispText.setAttribute("scale", "0");
        }
        document.querySelectorAll(".webgl-distort-text").forEach((el) => {
          el.classList.remove("is-distorted");
        });
        lastHoveredTextRef.current = null;
      }

      // 2. Image filter update
      currentImageScaleRef.current += (targetImageScaleRef.current - currentImageScaleRef.current) * scaleLerp;
      const activeImage = hoveredImageRef.current || lastHoveredImageRef.current;
      if (activeImage && currentImageScaleRef.current > 0.01) {
        const screenX = currentMouseX * width;
        const screenY = (1.0 - currentMouseY) * height;
        const localX = (screenX + window.scrollX) - hoveredImagePosRef.current.docLeft;
        const localY = (screenY + window.scrollY) - hoveredImagePosRef.current.docTop;

        const radiusImage = Math.round(lensRadius * 4.5) / 2;
        if (maskImage) {
          maskImage.setAttribute("x", (localX - radiusImage).toFixed(1));
          maskImage.setAttribute("y", (localY - radiusImage).toFixed(1));
        }
        if (dispImage) {
          const imgBaseScale = targetImageScaleRef.current;
          if (imgBaseScale > 0) {
            const dynamicImgScale = imgBaseScale + currentVelocity * width * 0.2;
            const imgScaleVal = Math.min(dynamicImgScale, imgBaseScale * 1.5) * (currentImageScaleRef.current / imgBaseScale);
            dispImage.setAttribute("scale", imgScaleVal.toFixed(1));
          } else {
            dispImage.setAttribute("scale", currentImageScaleRef.current.toFixed(1));
          }
        }
      } else {
        if (dispImage) {
          dispImage.setAttribute("scale", "0");
        }
        document.querySelectorAll(".webgl-distort-image").forEach((el) => {
          el.classList.remove("is-distorted");
        });
        lastHoveredImageRef.current = null;
      }

      // Render scene
      renderer.render({ scene, camera });
    };

    animationFrameId = requestAnimationFrame(loop);
    handleResize();

    // Cleanups on unmount
    return () => {
      document.documentElement.classList.remove("webgl-active");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      try {
        if (bgHeroTex && bgHeroTex.texture) gl.deleteTexture(bgHeroTex.texture);
        if (bgPhiloTex && bgPhiloTex.texture) gl.deleteTexture(bgPhiloTex.texture);
        if (bgProjTex && bgProjTex.texture) gl.deleteTexture(bgProjTex.texture);
        if (bgCompTex && bgCompTex.texture) gl.deleteTexture(bgCompTex.texture);
        if (bgGeometry) bgGeometry.remove();
        if (bgProgram) bgProgram.remove();
        scene.children.forEach((child) => child.setParent(null));
      } catch (err) {
        console.error("OGL cleanups release error:", err);
      }
    };
  }, [
    lensRadius,
    maxDistort,
    strength,
    falloff,
    lerpAmount,
    velocityMultiplier,
    chromaticAberrationStrength,
    noiseStrength
  ]);

  // SVG filter continuous flowing liquid background animation disabled to resolve 60fps noise generation CPU lag
  useEffect(() => {
    // Left empty intentionally to keep turbulence baseFrequency static and performant
  }, [isEnabled]);



  return (
    <>
      {/* SVG liquid distortion filter definitions */}
      {isEnabled && (
        <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
          <defs>
            <filter id="liquid-text-filter" filterUnits="userSpaceOnUse" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence id="svg-turb-text" type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="1" result="noise" />
              <feImage id="svg-mask-text" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><radialGradient id='gt' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='white'/><stop offset='30%' stop-color='white'/><stop offset='100%' stop-color='black'/></radialGradient></defs><circle cx='50' cy='50' r='50' fill='url(%23gt)'/></svg>" x="-9999" y="-9999" width={Math.round(lensRadius * 3.5)} height={Math.round(lensRadius * 3.5)} result="mask" />
              <feColorMatrix in="noise" type="matrix" values="1 0 0 0 -0.5 0 1 0 0 -0.5 0 0 1 0 -0.5 0 0 0 1 0" result="biased_noise" />
              <feComposite in="biased_noise" in2="mask" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="masked_noise" />
              <feColorMatrix in="masked_noise" type="matrix" values="1 0 0 0 0.5 0 1 0 0 0.5 0 0 1 0 0.5 0 0 0 0 1" result="final_map" />
              <feDisplacementMap id="svg-disp-text" in="SourceGraphic" in2="final_map" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <filter id="liquid-image-filter" filterUnits="userSpaceOnUse" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence id="svg-turb-image" type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="1" result="noise" />
              <feImage id="svg-mask-image" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><radialGradient id='gi' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='white'/><stop offset='30%' stop-color='white'/><stop offset='100%' stop-color='black'/></radialGradient></defs><circle cx='50' cy='50' r='50' fill='url(%23gi)'/></svg>" x="-9999" y="-9999" width={Math.round(lensRadius * 4.5)} height={Math.round(lensRadius * 4.5)} result="mask" />
              <feColorMatrix in="noise" type="matrix" values="1 0 0 0 -0.5 0 1 0 0 -0.5 0 0 1 0 -0.5 0 0 0 1 0" result="biased_noise" />
              <feComposite in="biased_noise" in2="mask" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="masked_noise" />
              <feColorMatrix in="masked_noise" type="matrix" values="1 0 0 0 0.5 0 1 0 0 0.5 0 0 1 0 0.5 0 0 0 0 1" result="final_map" />
              <feDisplacementMap id="svg-disp-image" in="SourceGraphic" in2="final_map" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Global CSS style tags */}
      <style>{`
        /* Hide standard DOM backgrounds when WebGL is active */
        html.webgl-active .bg-image-layer,
        html.webgl-active .company-bg-layer,
        html.webgl-active .bg-dark-overlay {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Prevent solid background from covering the WebGL canvas */
        html.webgl-active #main-background {
          background: transparent !important;
          background-color: transparent !important;
        }

        /* Apply the high-performance SVG displacement filter on active text and images */
        .webgl-distort-text.is-distorted {
          filter: url(#liquid-text-filter);
          will-change: filter, transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .webgl-distort-image.is-distorted {
          filter: url(#liquid-image-filter);
          will-change: filter, transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        /* Standard absolute background canvas container */
        .webgl-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      {/* Background distortion canvas */}
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="webgl-container"
        />
      )}

      {/* Foreground contents */}
      <div className="relative w-full h-full">
        {children}
      </div>
    </>
  );
}
