# MotionOS

Animation library for React: presets, spring physics, AnimatePresence, and scroll-triggered sections.

## How people know what to use (npm)

When someone finds **motionos-react** on npm they see:

1. **Package README** — Each published package has its own README (see `packages/react/README.md`) with install, “what to use” table, quick start, and API. That’s what appears on the npm package page.
2. **Repository** — `homepage` and `repository` in package.json point here, so they can open the full README and run the demo/Storybook.
3. **Optional docs site** — You can deploy Storybook (e.g. to Vercel) and set `homepage` to that URL so the npm page links to live docs.

## Install

```bash
pnpm add motionos-core motionos-react
```

## Usage

```jsx
import { MotionProvider, Motion, MotionText, MotionSection, MotionPage, AnimatePresence, presets } from "motionos-react";

function App() {
  return (
    <MotionProvider>
      <Motion animation="fadeInUp">Content</Motion>
      <MotionText animation="slideInRight">Animated text</MotionText>

      <MotionSection animation="fadeInUp" spring>
        <h2>Section animates when in view</h2>
      </MotionSection>

      <AnimatePresence mode="wait">
        <MotionPage key={route} animation="pageFade">
          {pageContent}
        </MotionPage>
      </AnimatePresence>
    </MotionProvider>
  );
}
```

## API

- **Motion** — Wrap any element with a preset. Props: `animation`, `spring`, `springConfig`, `as`
- **MotionText** — Motion with `as="span"`
- **MotionSection** — Animates when section enters viewport. Props: `animation`, `spring`, `threshold`
- **MotionPage** — For route-level transitions. Use with `AnimatePresence` and `key={route}`
- **AnimatePresence** — Mount/unmount transitions. Props: `mode` ("wait" | "sync"), `exitDuration`
- **useInView** — Hook for viewport detection
- **presets** — All animation presets (fadeIn, slideInUp, scaleIn, bounceIn, pageFade, etc.)

## Presets

Naming aligned with **Animate.css** where possible. Includes:

- **Fade:** fadeIn, fadeOut, fadeInUp/Down/Left/Right, fadeInUpBig, fadeInTopLeft, fadeOut*, etc.
- **Back:** backInDown/Up/Left/Right, backOut*
- **Slide:** slideIn*/slideOut*
- **Bounce:** bounceIn*, bounceOut*, bounce (attention)
- **Zoom:** zoomIn*, zoomOut*, scaleIn, scaleOut
- **Rotate:** rotateIn*, rotateOut*, rotateInDownLeft, etc.
- **Flip:** flipInX/Y, flipOutX/Y
- **Light speed:** lightSpeedInRight/Left, lightSpeedOut*
- **Specials:** rollIn, rollOut, jackInTheBox, hinge
- **Attention:** pulse, shakeX, shakeY, headShake, swing, tada, wobble, jello, heartBeat, flash, rubberBand
- **Page:** pageFade, pageSlide, pageScale

Use `presets` from `motionos-react` or pass the preset name to `animation`.

## Spring

Use `spring` and `springConfig`: `"bouncy"` | `"smooth"` | `"snappy"` | `{ stiffness, damping }`.

## Demo

```bash
pnpm install
pnpm --filter demo dev
```

## Storybook (docs + test animations)

Side pane lists all animations; click one to see it run. Use the **Docs** tab to see the code.

```bash
pnpm --filter demo storybook
```

Open **http://localhost:6006** — then open **Introduction** and **Animations** in the sidebar.

## License

MIT
