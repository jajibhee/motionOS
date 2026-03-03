import { useState } from "react";
import {
  MotionProvider,
  Motion,
  MotionText,
  MotionSection,
  MotionPage,
  AnimatePresence,
  presets,
} from "motionos-react";

const presetNames = [
  "fadeIn", "fadeInUp", "fadeInLeft", "fadeInUpBig", "fadeInTopLeft",
  "backInDown", "backInUp", "slideInUp", "slideInLeft",
  "bounceIn", "bounceInUp", "bounceInLeft", "zoomIn", "zoomInUp",
  "rotateIn", "rotateInDownLeft", "flipInX", "lightSpeedInRight",
  "rollIn", "jackInTheBox", "pulse", "shakeX", "tada", "heartBeat",
  "pageFade", "pageSlide", "pageScale",
];

function PresetGallery() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <h2>Preset gallery</h2>
      <p>Click to re-run animation</p>
      <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16 }}>
        Replay
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
        {presetNames.slice(0, 16).map((name) => (
          <Motion key={`${name}-${key}`} animation={name} as="div">
            <div
              style={{
                padding: 16,
                background: "#e0e0e0",
                borderRadius: 8,
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {name}
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
}

function SpringDemo() {
  return (
    <div>
      <h2>Spring animations</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
        <Motion animation="fadeInUp" spring springConfig="bouncy">
          <div style={{ padding: 24, background: "#bbdefb", borderRadius: 12 }}>Bouncy</div>
        </Motion>
        <Motion animation="scaleIn" spring springConfig="smooth">
          <div style={{ padding: 24, background: "#c8e6c9", borderRadius: 12 }}>Smooth</div>
        </Motion>
        <Motion animation="slideInRight" spring springConfig="snappy">
          <div style={{ padding: 24, background: "#ffccbc", borderRadius: 12 }}>Snappy</div>
        </Motion>
      </div>
    </div>
  );
}

function PageTransitionDemo() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <h2>Page transition (AnimatePresence)</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setPage(1)}>Page 1</button>
        <button onClick={() => setPage(2)} style={{ marginLeft: 8 }}>Page 2</button>
        <button onClick={() => setPage(3)} style={{ marginLeft: 8 }}>Page 3</button>
      </div>
      <AnimatePresence mode="wait" exitDuration={200}>
        <MotionPage key={page} animation="pageFade">
          <div
            style={{
              padding: 32,
              background: page === 1 ? "#e3f2fd" : page === 2 ? "#f3e5f5" : "#fff8e1",
              borderRadius: 12,
              minHeight: 120,
            }}
          >
            <MotionText animation="fadeIn">Page {page}</MotionText>
          </div>
        </MotionPage>
      </AnimatePresence>
    </div>
  );
}

function SectionScrollDemo() {
  return (
    <div>
      <h2>Scroll-triggered sections</h2>
      <p style={{ marginBottom: 24 }}>Scroll down to see sections animate in.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        <MotionSection animation="fadeInUp">
          <div style={{ padding: 24, background: "#e8f5e9", borderRadius: 12 }}>
            Section 1 (fadeInUp)
          </div>
        </MotionSection>
        <MotionSection animation="slideInLeft">
          <div style={{ padding: 24, background: "#e1f5fe", borderRadius: 12 }}>
            Section 2 (slideInLeft)
          </div>
        </MotionSection>
        <MotionSection animation="fadeInUp" spring>
          <div style={{ padding: 24, background: "#fce4ec", borderRadius: 12 }}>
            Section 3 (fadeInUp + spring)
          </div>
        </MotionSection>
        <MotionSection animation="scaleIn">
          <div style={{ padding: 24, background: "#f3e5f5", borderRadius: 12 }}>
            Section 4 (scaleIn)
          </div>
        </MotionSection>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("presets");

  const tabs = [
    { id: "presets", label: "Presets" },
    { id: "spring", label: "Spring" },
    { id: "page", label: "Page transition" },
    { id: "sections", label: "Sections" },
  ];

  return (
    <MotionProvider>
      <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 720 }}>
        <h1>MotionOS</h1>
        <p style={{ color: "#666", marginBottom: 24 }}>Animation library: presets, springs, AnimatePresence, MotionSection</p>

        <div style={{ marginBottom: 24, display: "flex", gap: 8 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 16px",
                background: tab === t.id ? "#333" : "#eee",
                color: tab === t.id ? "white" : "black",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "presets" && <PresetGallery />}
        {tab === "spring" && <SpringDemo />}
        {tab === "page" && <PageTransitionDemo />}
        {tab === "sections" && <SectionScrollDemo />}
      </div>
    </MotionProvider>
  );
}

export default App;
