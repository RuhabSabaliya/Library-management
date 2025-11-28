// src/index.js
// This is the entry file created by Create React App.
// We only render <App /> into the root div.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// If you use Bootstrap, you can uncomment this line:
// import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode helps catch some errors in development
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
