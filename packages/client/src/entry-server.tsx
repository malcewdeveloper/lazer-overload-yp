import ReactDOM from "react-dom/server";
import App from "./App";
import "./index.css";
import {
    Request as ExpressRequest,
    Response as ExpressResponce,
} from "express";
import { StaticRouter } from "react-router-dom";

export const createContext = (req: ExpressRequest): PageInitContext => ({
    clientToken: req.cookies.token,
});

export const render = async (req: ExpressRequest, res: ExpressResponce) => {
    const context = {};

    // if (context instanceof Response) {
    //     throw context;
    // }

    // написать функцию по обращению к страницам и вызовам
    // их инициализирующих функций (хранить инициализацию рядом со страницами)
    // передавать контекст с помощью createContext(req)

    if ("url" in context) {
        res.writeHead(301, {
            Location: context.url as string,
        });
        res.end();
    }

    return {
        html: ReactDOM.renderToString(
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>,
        ),
        initialState: {},
    };
};
