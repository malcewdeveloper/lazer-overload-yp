import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ConfigProvider, theme } from "antd";
import { Routes } from "./pages";

function App() {
    const isDark = Math.random() > 0.5;

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    algorithm: isDark
                        ? theme.darkAlgorithm
                        : theme.compactAlgorithm,
                }}
            >
                <Routes />
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
