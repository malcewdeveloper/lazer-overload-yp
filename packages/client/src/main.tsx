import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useUserStore } from "./entities/user";
import "./index.css";

const initialState =
    typeof window === "undefined" ? undefined : window.APP_INITIAL_STATE;
useUserStore.setState(initialState);

ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
