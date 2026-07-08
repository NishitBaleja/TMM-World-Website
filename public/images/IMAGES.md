# Image Assets Guide

## Directory Structure

```
public/images/
├── home/
│   └── expertise/                  ← Home page expertise section (Projects.jsx)
│       ├── brand-building.webp      content.home.services[0].img
│       ├── web-development.webp     content.home.services[1].img
│       └── social-media-management.webp  content.home.services[2].img
├── expertise/                       ← Expertise page showcase (ExpertiseShowcase.jsx)
│   ├── brand-building.webp          content.projects[0].img
│   ├── web-development.webp         content.projects[1].img
│   └── social-media-management.webp content.projects[2].img
└── services/                        ← Service detail pages (ServicePageClient.jsx)
    ├── brand-building/
    │   ├── 01.webp                  serviceDetails.brand-building.images[0] — discipline
    │   ├── 02.webp                  serviceDetails.brand-building.images[1] — execution
    │   └── 03.webp                  serviceDetails.brand-building.images[2] — outcome
    ├── web-development/
    │   ├── 01.webp                  serviceDetails.web-development.images[0]
    │   ├── 02.webp                  serviceDetails.web-development.images[1]
    │   └── 03.webp                  serviceDetails.web-development.images[2]
    └── social-media-management/
        ├── 01.webp                  serviceDetails.social-media-management.images[0]
        ├── 02.webp                  serviceDetails.social-media-management.images[1]
        └── 03.webp                  serviceDetails.social-media-management.images[2]
```

## Image Src Paths (to use in code)

| Section | Image Path |
|---|---|
| Home — Brand Building | `/images/home/expertise/brand-building.webp` |
| Home — Web Development | `/images/home/expertise/web-development.webp` |
| Home — Social Media | `/images/home/expertise/social-media-management.webp` |
| Expertise — Brand Building | `/images/expertise/brand-building.webp` |
| Expertise — Web Development | `/images/expertise/web-development.webp` |
| Expertise — Social Media | `/images/expertise/social-media-management.webp` |
| Service Brand — img 1 | `/images/services/brand-building/01.webp` |
| Service Brand — img 2 | `/images/services/brand-building/02.webp` |
| Service Brand — img 3 | `/images/services/brand-building/03.webp` |
| Service Web — img 1 | `/images/services/web-development/01.webp` |
| Service Web — img 2 | `/images/services/web-development/02.webp` |
| Service Web — img 3 | `/images/services/web-development/03.webp` |
| Service Social — img 1 | `/images/services/social-media-management/01.webp` |
| Service Social — img 2 | `/images/services/social-media-management/02.webp` |
| Service Social — img 3 | `/images/services/social-media-management/03.webp` |
