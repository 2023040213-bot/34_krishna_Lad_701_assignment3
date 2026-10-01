import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import App from "./App";
import { CartProvider } from "./cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </React.StrictMode>
);