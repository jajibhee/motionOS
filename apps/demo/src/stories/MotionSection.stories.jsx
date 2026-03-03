import { MotionSection } from "motionos-react";

export default {
  title: "MotionSection",
  component: MotionSection,
  argTypes: {
    animation: {
      control: "select",
      options: ["fadeInUp", "slideInLeft", "scaleIn", "bounceInUp"],
    },
    spring: { control: "boolean" },
  },
};

export const Default = {
  args: {
    animation: "fadeInUp",
    spring: false,
  },
  render: (args) => (
    <div style={{ padding: 48 }}>
      <p style={{ marginBottom: 200 }}>Scroll down to see the section animate in.</p>
      <MotionSection {...args}>
        <div
          style={{
            padding: 32,
            background: "#e8f5e9",
            borderRadius: 12,
          }}
        >
          <h3>Section content</h3>
          <p>This animates when it enters the viewport.</p>
        </div>
      </MotionSection>
    </div>
  ),
};
