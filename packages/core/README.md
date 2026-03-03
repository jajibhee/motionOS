# motionos-core

Framework-agnostic animation engine (scheduler, spring, transform/opacity). Zero dependencies.

Most users want **motionos-react** for React components. Use this package directly only if you're building bindings for another framework or need the low-level API.

## Install

```bash
npm install motionos-core
```

## Usage

```js
import { createEngine } from "motionos-core";

const engine = createEngine();
engine.register("my-key", element);
engine.animateFromTo(element, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 300);
// or: engine.animateSpring(element, { opacity: 0 }, { opacity: 1 }, "bouncy");
```

See the [repo](https://github.com/motionos/motionos) for full API and React usage.
