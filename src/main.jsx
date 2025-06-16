import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import AnimatedRoutes from "../AnimatedRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import '../i18n.js'
// Create the root
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("No element with id 'root' found.");
} else {
  const root = ReactDOMClient.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </Provider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
        containerStyle={{
          top: 50,
          right: 30,
        }}
        transition={{
          enter: { opacity: 1, transform: 'translateY(0)' }, // Smooth fade in
          exit: { opacity: 0, transform: 'translateY(-20px)' }, // Smooth fade out
          duration: 300, // Duration of the transition
        }}
      />
    </React.StrictMode>
  );
}
