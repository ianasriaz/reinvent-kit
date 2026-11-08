import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import SpeakerDeckViewer from "./components/speaker/SpeakerDeckViewer"
import "./index.css"

const rootElement = document.getElementById("root")
if (rootElement) {
  const isSpeakerDeck =
    rootElement.dataset.view === "speaker-deck" ||
    (window as any).__AWS_VIEW__ === "speaker-deck" ||
    (window as any).REINVENT_KIT_ENV?.view === "speaker-deck" ||
    window.location.pathname.includes("speaker-deck")

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {isSpeakerDeck ? <SpeakerDeckViewer /> : <App />}
    </React.StrictMode>,
  )
}
