import React from "react";
import ReactDOM from "react-dom/server";
import App from "./App";
import { useUserStore } from "./entities/user";
import { getUser } from "./entities/user/queries";
import "./index.css";

export const render = async () => {
    const { getState } = useUserStore;

    return {
        html: ReactDOM.renderToString(<App />),
        initialState: getState(),
    };
};
