import { Router } from "react-router-dom";
import "./App.css";
import { history } from "./service";
import { ConfigProvider, theme } from "antd";
import { Routes } from "./pages";
import { ITheme, useTheme } from "./entities/theme";

function App() {
    // const isDark = Math.random() > 0.5;
    const isDark = useTheme((state: ITheme) => state.isDark);
    console.log("isDark?", isDark);

    return (
        <Router history={history}>
            <ConfigProvider
                theme={{
                    algorithm: isDark
                        ? theme.darkAlgorithm
                        : theme.compactAlgorithm,
                }}
            >
                <Routes />
            </ConfigProvider>
        </Router>
    );
}

export default App;
