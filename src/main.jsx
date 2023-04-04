import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DIDprovider } from "./context/DIDcontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DIDprovider>
    <React.StrictMode>
      <Router basename="/">
        <App />
      </Router>
    </React.StrictMode>
  </DIDprovider>
);
