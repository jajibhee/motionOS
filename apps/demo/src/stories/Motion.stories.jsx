import { Motion, presets } from "motionos-react";

const presetNames = Object.keys(presets).filter(
  (k) => !["fade", "fadeUp", "fadeDown", "slideLeft", "slideRight", "scale", "shake"].includes(k)
);

export default {
  title: "Motion",
  component: Motion,
  argTypes: {
    animation: {
      control: "select",
      options: presetNames,
    },
    spring: { control: "boolean" },
    springConfig: {
      control: "select",
      options: ["bouncy", "smooth", "snappy", "gentle"],
    },
  },
};

export const Default = {
  args: {
    animation: "fadeInUp",
    spring: false,
    children: "Animated content",
  },
  render: (args) => (
    <Motion {...args}>
      <div
        style={{
          padding: 24,
          background: "#e3f2fd",
          borderRadius: 12,
          minWidth: 160,
        }}
      >
        {args.children}
      </div>
    </Motion>
  ),
};

export const AllPresets = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
      {presetNames.slice(0, 24).map((name) => (
        <Motion key={name} animation={name}>
          <div
            style={{
              padding: 12,
              background: "#f5f5f5",
              borderRadius: 8,
              fontSize: 11,
              textAlign: "center",
            }}
          >
            {name}
          </div>
        </Motion>
      ))}
    </div>
  ),
};
