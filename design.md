# Portfolio Website: UI Design & AI Agent Prompt Guide

This document details the visual design, interactive elements, and animations of the portfolio website. It also provides copy-pasteable **AI Agent Prompts** designed to instruct an AI coding assistant to replicate or extend these exact UI components.

---

## 🎨 Core Design Tokens & Theme

The portfolio utilizes a premium, dark-mode cyberpunk aesthetic focused on high-contrast neon accents, glassmorphic glows, and fluid micro-interactions.

*   **Font Family:** `"Geist", sans-serif` (highly geometric, clean, modern).
*   **Background Color (`--backgroundColor`):** `#0b080c` (a deep, dark-plum obsidian shade).
*   **Accent Color (`--accentColor`):** `#c2a4ff` (a vivid, pastel neon lavender/violet).
*   **Layout Constraint:** Fixed viewport height logic (`--vh`) to ensure layouts never collapse on mobile viewports.

---

## 🕹️ Key UI Components & AI Prompt Specifications

### 1. Interactive Page Preloader with Viewport-Scale Zoom Transition
*   **Visual Behavior:** A light-grey preloading screen (`#eae5ec`) with a marquee background. In the center is a dark pill-shaped progress button. On hover, a gradient glow follows the cursor using custom properties (`--mouse-x` and `--mouse-y`).
*   **Transition Logic:** When the progress reaches 100%, the text changes to "Welcome". Upon enter, the pill-shaped button expands exponentially (`min-width: calc(100vw + 5000px)`) to mask the viewport in solid black. This smooth, high-fidelity zoom transition masks the unmounting of the preloader and the reveal of the main website contents.

#### 📝 AI Agent Prompt: Preloader & Zoom Transition
> **Prompt:**
> "Create a high-fidelity React preloading component in TypeScript. The screen background should be `#eae5ec` with an infinite horizontal text marquee scrolling behind. In the center, design a pill-shaped loader button with a black background (`#000`). 
> 
> Implement a hover-state glow effect where a blurred lavender overlay (`#a87cff` with a 30px blur filter) follows the user's cursor coordinates using inline CSS custom properties (`--mouse-x` and `--mouse-y`) updated via an `onMouseMove` listener.
> 
> The loading progress should count from 0% to 100% over 2 seconds. When it hits 100%, swap the text to 'Welcome'. 
> 
> Implement an entrance transition: when entering the website, apply a class that expands the pill button's scale exponentially using `min-width: calc(100vw + 5000px)` and `min-height: calc(100vh + 500px)` to mask the entire screen in black. Once the transition completes, trigger a callback to unmount the preloader and fade in the homepage."

---

### 2. Lag-Following Custom Cursor with Element Snapping
*   **Visual Behavior:** A custom circular pointer that follows the mouse with a slight trailing lag (inertia). 
*   **Hover States:** 
    *   **Snap-to-Element:** When hovering over interactive icons/links marked with `data-cursor="icons"`, the cursor locks (snaps) to the bounds of the element, forming a highlight border.
    *   **Hide Cursor:** When hovering over logos/text links marked with `data-cursor="disable"`, the custom cursor fades out to allow native browser behaviors.

#### 📝 AI Agent Prompt: Custom Cursor
> **Prompt:**
> "Write a custom React cursor component using TypeScript and GSAP. The cursor should be a div positioned absolutely with a fixed layout.
> 
> Implement a smooth lag/inertia effect where the cursor follows the mouse coordinates. Use `requestAnimationFrame` to linearly interpolate (lerp) the cursor's position towards the mouse position with a delay divisor (e.g., `cursorPos.x += (mousePos.x - cursorPos.x) / 6`).
> 
> Query the DOM for elements containing a `data-cursor` attribute:
> 1. If `data-cursor="icons"`, on hover, lock the cursor's translation to the target element's bounding rect (`getBoundingClientRect`) and add a class `.cursor-icons` to style the locked border.
> 2. If `data-cursor="disable"`, on hover, hide the custom cursor (opacity 0).
> Ensure all mouse event listeners are cleaned up properly when the component unmounts."

---

### 3. Floating Character Animation & Ambient Mesh Glow Rings
*   **Visual Behavior:** The landing page features a central character illustration bobbing vertically and skewing subtly. Below the character is a radial drop shadow that shrinks and expands in reverse sync with the bobbing. In the background, fixed glowing circles float and rotate to create a glassmorphic mesh gradient effect.

#### 📝 AI Agent Prompt: Floating Hero & Glowing Background
> **Prompt:**
> "Design a CSS-only floating character section with drop-shadow scaling and rotating ambient background rings.
> 
> 1. **Character Container:** Position an illustration in the center. Apply a vertical floating animation `character-bob` (translate Y by -12px at 50% using an ease-in-out curve over 5.8s).
> 2. **Character Skew:** Inside the bobbing container, animate the image with a subtle rotational skewing `character-bow` (rotate between -1deg and 7deg, dipping slightly at the peak of the animation).
> 3. **Synced Drop Shadow:** Position a radial-gradient shadow underneath the character. Animate its scale and opacity (`character-shadow` keyframes) in reverse sync: when the character floats up, the shadow should scale down to `0.82` and its opacity should decrease to `0.35`.
> 4. **Glow Rings:** Create two fixed background divs styled as glow rings: `300px` circle with a background of `#fb8dff` and a `box-shadow: inset -50px 40px 50px rgba(84, 0, 255, 0.6)`. Add a `filter: blur(60px)` and animate them to rotate infinitely to create a shifting ambient mesh gradient light leak."

---

### 4. Coordinated GSAP Reveal Timeline
*   **Visual Behavior:** Once the preloader fades out, a master GSAP timeline coordinates the entry of header elements, social icons, and text sections, ensuring they animate in sequence rather than all at once.

#### 📝 AI Agent Prompt: GSAP Reveal Timeline
> **Prompt:**
> "Write a GSAP timeline function in TypeScript to orchestrate the entrance animations of the landing page.
> 
> Define a timeline with defaults: `duration: 1.2, ease: 'power3.out'`. Chain the following animations:
> 1. Fade in the navigation header, fade layer, and social icon panels simultaneously (`opacity: 0` to `1`) starting at `0.1s`.
> 2. Slide up the landing intro header (`.landing-intro h1`, `h2`) and description elements from `y: 80` to `y: 0`, shifting their opacity from `0` to `1` and removing a blur filter (`filter: blur(5px)` to `blur(0px)`) with a stagger of `0.2s`, starting at `0.3s`.
> 3. Animate the main developer titles, and finally transition the body background color to `#0b080c` over `0.5s` at the `1.0s` mark.
> 
> Additionally, implement a loop text timeline that alternates the sub-headers ('Developer' and 'Designer') by translating them vertically out of view, swapping them, and translating them back in infinitely."
