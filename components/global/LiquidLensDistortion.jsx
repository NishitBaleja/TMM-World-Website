"use client";
import React, { useRef, useEffect, useState } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Texture, Plane, Vec2 } from "ogl";
import gsap from "@/lib/gsap";

export default function LiquidLensDistortion({
  children,
  lensRadius = 180,                // Lens radius in pixels
  maxDistort = 25,                 // Maximum displacement in pixels
  strength = 16,                   // Base distortion displacement in pixels
  falloff = 2.5,                   // Easing power for lens radial falloff
  lerpAmount = 0.08,               // Smoothing/lag factor (lower = smoother lag)
  velocityMultiplier = 0.15,       // Multiplier for mouse velocity scaling
  chromaticAberrationStrength = 1.0, // Chromatic aberration scale in pixels
  noiseStrength = 2.0,             // Faint noise pattern intensity in pixels
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);

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
      uNoiseStrength: { value: noiseStrength }
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

      vec2 getCoverUv(vec2 uv, float imgAspect, float screenAspect, float yOffset) {
        vec2 shiftedUv = uv;
        shiftedUv.y += yOffset;
        
        vec2 ratio = vec2(
          min(screenAspect / imgAspect, 1.0),
          min(imgAspect / screenAspect, 1.0)
        );
        // Scale ratio by 0.85 to zoom in slightly and prevent edges/borders from showing during parallax scroll
        return (shiftedUv - 0.5) * ratio * 0.85 + 0.5;
      }

      void main() {
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

        vec2 uvHero = getCoverUv(finalUv, uHeroAspect, uViewportAspect, uBgYOffset);
        vec2 uvPhilo = getCoverUv(finalUv, uPhiloAspect, uViewportAspect, uBgYOffset);
        vec2 uvProj = getCoverUv(finalUv, uProjAspect, uViewportAspect, uBgYOffset);
        vec2 uvComp = getCoverUv(finalUv, uCompAspect, uViewportAspect, uBgYOffset);

        vec4 colHero, colPhilo, colProj, colComp;

        if (dist < uRadius) {
          float refractPower = pow(1.0 - (dist / uRadius), 2.5);
          vec2 caDisp = -normalize(pixelDiff) * uChromaticAberration * refractPower / uResolution;

          vec2 uvHeroR = getCoverUv(finalUv + caDisp, uHeroAspect, uViewportAspect, uBgYOffset);
          vec2 uvHeroB = getCoverUv(finalUv - caDisp, uHeroAspect, uViewportAspect, uBgYOffset);
          colHero = vec4(texture2D(uHeroTex, uvHeroR).r, texture2D(uHeroTex, uvHero).g, texture2D(uHeroTex, uvHeroB).b, texture2D(uHeroTex, uvHero).a);

          vec2 uvPhiloR = getCoverUv(finalUv + caDisp, uPhiloAspect, uViewportAspect, uBgYOffset);
          vec2 uvPhiloB = getCoverUv(finalUv - caDisp, uPhiloAspect, uViewportAspect, uBgYOffset);
          colPhilo = vec4(texture2D(uPhiloTex, uvPhiloR).r, texture2D(uPhiloTex, uvPhilo).g, texture2D(uPhiloTex, uvPhiloB).b, texture2D(uPhiloTex, uvPhilo).a);

          vec2 uvProjR = getCoverUv(finalUv + caDisp, uProjAspect, uViewportAspect, uBgYOffset);
          vec2 uvProjB = getCoverUv(finalUv - caDisp, uProjAspect, uViewportAspect, uBgYOffset);
          colProj = vec4(texture2D(uProjTex, uvProjR).r, texture2D(uProjTex, uvProj).g, texture2D(uProjTex, uvProjB).b, texture2D(uProjTex, uvProj).a);

          vec2 uvCompR = getCoverUv(finalUv + caDisp, uCompAspect, uViewportAspect, uBgYOffset);
          vec2 uvCompB = getCoverUv(finalUv - caDisp, uCompAspect, uViewportAspect, uBgYOffset);
          colComp = vec4(texture2D(uCompTex, uvCompR).r, texture2D(uCompTex, uvComp).g, texture2D(uCompTex, uvCompB).b, texture2D(uCompTex, uvComp).a);
        } else {
          colHero = texture2D(uHeroTex, uvHero);
          colPhilo = texture2D(uPhiloTex, uvPhilo);
          colProj = texture2D(uProjTex, uvProj);
          colComp = texture2D(uCompTex, uvComp);
        }

        float heroOpacity = 0.99 * clamp((0.4 - uFadeHeroToPhilo) / 0.4, 0.0, 1.0);
        float philoOpacity = 0.99 * clamp((uFadeHeroToPhilo - 0.6) / 0.4, 0.0, 1.0) * clamp((0.4 - uFadePhiloToProj) / 0.4, 0.0, 1.0);
        float projOpacity = 0.99 * clamp((uFadePhiloToProj - 0.6) / 0.4, 0.0, 1.0) * clamp((0.4 - uFadeProjToComp) / 0.4, 0.0, 1.0);
        float compOpacity = 0.99 * clamp((uFadeProjToComp - 0.6) / 0.4, 0.0, 1.0) * clamp((0.4 - uFadeCompToFooter) / 0.4, 0.0, 1.0);

        vec4 finalCol = vec4(0.0, 0.0, 0.0, 1.0);
        finalCol = mix(finalCol, colHero, heroOpacity);
        finalCol = mix(finalCol, colPhilo, philoOpacity);
        finalCol = mix(finalCol, colProj, projOpacity);
        finalCol = mix(finalCol, colComp, compOpacity);

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

    loadBgTexture("/images/home/hero-bg-img.webp", bgUniforms.uHeroAspect, bgHeroTex);
    loadBgTexture("/images/home/philosophy-bg-img.webp", bgUniforms.uPhiloAspect, bgPhiloTex);
    loadBgTexture("/images/home/projects-bg-img.webp", bgUniforms.uProjAspect, bgProjTex);
    loadBgTexture("/images/home/company-bg-img.webp", bgUniforms.uCompAspect, bgCompTex);

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize events
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      renderer.setSize(width, height);
      updateCamera();

      bgUniforms.uViewportAspect.value = width / height;
      bgUniforms.uResolution.value.set(width, height);
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

      // Interpolate mouse coordinates (spring-physics / lerp)
      if (targetMouseX > -9000) {
        const dx = targetMouseX - currentMouseX;
        const dy = targetMouseY - currentMouseY;

        currentMouseX += dx * lerpAmount;
        currentMouseY += dy * lerpAmount;

        const velocity = Math.sqrt(dx * dx + dy * dy);
        currentVelocity += (velocity - currentVelocity) * 0.15;
      }

      // Read Background scroll parameters and transitions from main background ID
      const bgEl = document.getElementById("main-background");
      if (bgEl) {
        const bgStyle = window.getComputedStyle(bgEl);
        bgUniforms.uFadeHeroToPhilo.value = parseFloat(bgStyle.getPropertyValue("--fade-hero-to-philosophy") || "0");
        bgUniforms.uFadePhiloToProj.value = parseFloat(bgStyle.getPropertyValue("--fade-philosophy-to-projects") || "0");
        bgUniforms.uFadeProjToComp.value = parseFloat(bgStyle.getPropertyValue("--fade-projects-to-company") || "0");
        bgUniforms.uFadeCompToFooter.value = parseFloat(bgStyle.getPropertyValue("--fade-company-to-footer") || "0");
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
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      try {
        bgHeroTex.delete();
        bgPhiloTex.delete();
        bgProjTex.delete();
        bgCompTex.delete();
        bgGeometry.dispose();
        bgProgram.dispose();
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

  // SVG filter mouse hover interactive wobble handler (Event Delegation)
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e) => {
      const target = e.target.closest(".webgl-distort-text, .webgl-distort-image");
      if (target) {
        const mapEl = document.getElementById("svg-displacement-map");
        if (mapEl) {
          gsap.killTweensOf(mapEl);
          // Quick wobble pulse effect
          const tl = gsap.timeline();
          tl.to(mapEl, {
            attr: { scale: 15 },
            duration: 0.25,
            ease: "power2.out"
          }).to(mapEl, {
            attr: { scale: 0 },
            duration: 0.6,
            ease: "elastic.out(1.2, 0.4)"
          });
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(".webgl-distort-text, .webgl-distort-image");
      if (target) {
        const mapEl = document.getElementById("svg-displacement-map");
        if (mapEl) {
          gsap.killTweensOf(mapEl);
          gsap.to(mapEl, {
            attr: { scale: 0 },
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isEnabled]);

  return (
    <>
      {/* SVG liquid distortion filter definitions */}
      {isEnabled && (
        <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
          <defs>
            <filter id="liquid-glass-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="svg-displacement-map" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Global CSS style tags */}
      <style>{`
        /* Hide standard DOM backgrounds when WebGL is active */
        html.webgl-active .bg-image-layer,
        html.webgl-active .bg-dark-overlay {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Prevent solid background from covering the WebGL canvas */
        html.webgl-active #main-background {
          background: transparent !important;
          background-color: transparent !important;
        }

        /* Apply the high-performance SVG displacement filter on hoverable text and images */
        .webgl-distort-text,
        .webgl-distort-image {
          filter: url(#liquid-glass-filter);
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
