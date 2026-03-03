# @motionos/react

React components and hooks for the MotionOS animation library.

## Install

```bash
npm install @motionos/core @motionos/react
```

You need both `@motionos/core` and `@motionos/react`.

## What to use

| Use case | Use this |
|----------|----------|
| Animate any element on mount | `<Motion animation="fadeInUp">` |
| Animate text | `<MotionText animation="slideInRight">` |
| Animate when section scrolls into view | `<MotionSection animation="fadeInUp">` |
| Page / route transitions | `<AnimatePresence>` + `<MotionPage key={route}">` |
| Bouncy / spring animation | `<Motion animation="bounceIn" spring />` |
| List of preset names | `import { presets } from "@motionos/react"` |

## Quick start

```jsx
import { MotionProvider, Motion } from "@motionos/react";

function App() {
  return (
    <MotionProvider>
      <Motion animation="fadeInUp">
        <div>This fades in and moves up</div>
      </Motion>
    </MotionProvider>
  );
}
```

## API

- **MotionProvider** — Wrap your app once. Required.
- **Motion** — `animation` (preset name), `spring`, `springConfig`, `as`
- **MotionText** — Same as Motion, renders a `span`
- **MotionSection** — Animates when in viewport. `animation`, `spring`, `threshold`
- **MotionPage** — For route transitions. Use with `AnimatePresence` and `key={route}`
- **AnimatePresence** — `mode="wait" | "sync"`, `exitDuration`
- **useInView** — `const [ref, inView] = useInView()`
- **presets** — Object of all preset names (fadeIn, slideInUp, bounceIn, etc.)

## Animation names (presets)

Pass any preset name to `animation`: `fadeIn`, `fadeInUp`, `fadeInDown`, `slideInUp`, `slideInLeft`, `bounceIn`, `bounceInUp`, `zoomIn`, `scaleIn`, `rotateIn`, `backInDown`, `flipInX`, `lightSpeedInRight`, `rollIn`, `jackInTheBox`, `pulse`, `shakeX`, `tada`, `pageFade`, `pageSlide`, and many more. Names follow Animate.css where possible.

## Spring

```jsx
<Motion animation="bounceInUp" spring springConfig="bouncy" />
// or: springConfig="smooth" | "snappy" | { stiffness: 170, damping: 26 }
```

## Docs

For a full list of presets and live examples, see the [GitHub repo](https://github.com/motionos/motionos) or run Storybook from the repo: `pnpm --filter demo storybook`.
