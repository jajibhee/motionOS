import { Motion } from "motionos-react";

/**
 * Each story shows one animation. Use the **Docs** tab (below) to see the code.
 * Toggle **Canvas** vs **Docs** to switch between live preview and usage code.
 */

const boxStyle = {
  padding: 24,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderRadius: 12,
  minWidth: 180,
  textAlign: "center",
};

function makeStory(animation, description) {
  return {
    args: { animation },
    parameters: {
      docs: {
        source: {
          code: `import { Motion } from "motionos-react";

<Motion animation="${animation}">
  <div>Your content</div>
</Motion>`,
          language: "jsx",
        },
        description: {
          story: description || `\`animation="${animation}"\` — run on mount.`,
        },
      },
    },
    render: (args) => (
      <Motion animation={args.animation}>
        <div style={boxStyle}>
          <strong>{args.animation}</strong>
        </div>
      </Motion>
    ),
  };
}

export default {
  title: "Animations",
  parameters: {
    docs: {
      description: {
        component: "Click an animation in the sidebar to see it run. Switch to the **Docs** tab to see how to use it in code.",
      },
    },
  },
};

// Fade
export const FadeIn = makeStory("fadeIn");
export const FadeInUp = makeStory("fadeInUp");
export const FadeInDown = makeStory("fadeInDown");
export const FadeInLeft = makeStory("fadeInLeft");
export const FadeInRight = makeStory("fadeInRight");
export const FadeInUpBig = makeStory("fadeInUpBig");
export const FadeInTopLeft = makeStory("fadeInTopLeft");

// Back
export const BackInDown = makeStory("backInDown");
export const BackInUp = makeStory("backInUp");
export const BackInLeft = makeStory("backInLeft");
export const BackInRight = makeStory("backInRight");

// Slide
export const SlideInUp = makeStory("slideInUp");
export const SlideInDown = makeStory("slideInDown");
export const SlideInLeft = makeStory("slideInLeft");
export const SlideInRight = makeStory("slideInRight");
export const SlideOutUp = makeStory("slideOutUp");
export const SlideOutLeft = makeStory("slideOutLeft");

// Bounce
export const BounceIn = makeStory("bounceIn");
export const BounceInUp = makeStory("bounceInUp");
export const BounceInDown = makeStory("bounceInDown");
export const BounceInLeft = makeStory("bounceInLeft");
export const BounceInRight = makeStory("bounceInRight");

// Zoom / Scale
export const ZoomIn = makeStory("zoomIn");
export const ZoomInUp = makeStory("zoomInUp");
export const ScaleIn = makeStory("scaleIn");
export const ZoomOut = makeStory("zoomOut");

// Rotate
export const RotateIn = makeStory("rotateIn");
export const RotateInDownLeft = makeStory("rotateInDownLeft");
export const RotateOut = makeStory("rotateOut");

// Flip & Light speed
export const FlipInX = makeStory("flipInX");
export const FlipInY = makeStory("flipInY");
export const LightSpeedInRight = makeStory("lightSpeedInRight");
export const LightSpeedInLeft = makeStory("lightSpeedInLeft");

// Specials
export const RollIn = makeStory("rollIn");
export const JackInTheBox = makeStory("jackInTheBox");
export const Hinge = makeStory("hinge");

// Attention
export const Pulse = makeStory("pulse");
export const ShakeX = makeStory("shakeX");
export const ShakeY = makeStory("shakeY");
export const Tada = makeStory("tada");
export const HeartBeat = makeStory("heartBeat");
export const Bounce = makeStory("bounce");

// Page
export const PageFade = makeStory("pageFade");
export const PageSlide = makeStory("pageSlide");
export const PageScale = makeStory("pageScale");
