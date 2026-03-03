import React from "react";
import ReactDOM from "react-dom/client";
import { MotionProvider } from "motionos-react";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </React.StrictMode>
);
