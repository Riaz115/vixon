import React from "react";
import ReactDOMClient from "react-dom/client"; // Use ReactDOMClient
import "./index.css";
import { Router } from "../routing.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
// import ReactPWAInstallProvider from "react-pwa-install";
import { Toaster } from "react-hot-toast";
import AnimatedRoutes from "../AnimatedRoutes.jsx";
import { BrowserRouter } from "react-router-dom";

// Create the root only once
const rootElement = document.getElementById("root");

if (rootElement) { // Ensure rootElement exists
  const root = ReactDOMClient.createRoot(rootElement); // Use createRoot from ReactDOMClient

  // Render the application
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        {/* <ReactPWAInstallProvider enableLogging> */}
        <BrowserRouter>
          <AnimatedRoutes />
         </BrowserRouter>
        {/* </ReactPWAInstallProvider> */}
      </Provider> 
      <Toaster position="top-right"  reverseOrder={false} 
       toastOptions={{
        duration: 4000,  // Adjust the duration to control how long the toast appears
        style: {
         
        },
      }}
      containerStyle={{
        top: 50,  // Adjust position if needed
        right: 30,
      }}
      // Smooth animation for the toast
      transition={{
        enter: { opacity: 1, transform: 'translateY(0)' }, // Smooth fade in
        exit: { opacity: 0, transform: 'translateY(-20px)' }, // Smooth fade out
        duration: 300, // Duration of the transition
      }}
      />

    </React.StrictMode>
  );
} else {
  //// console.log   .error("No element with id 'root' found.");
}


