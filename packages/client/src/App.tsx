// import { Router } from "react-router-dom";
// import { history } from "./service";
// import { Routes } from "./pages";

// function App() {
//     const isDark = Math.random() > 0.5;

//     return (
//         <Router history={history}>
//             <ConfigProvider
//                 theme={{
//                     algorithm: isDark
//                         ? theme.darkAlgorithm
//                         : theme.compactAlgorithm,
//                 }}
//             >
//                 <Routes />
//             </ConfigProvider>
//         </Router>
//     );
// }

import { ConfigProvider, theme } from "antd";
import "./App.css";

function App() {
    const isDark = Math.random() > 0.5;

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? theme.darkAlgorithm
                    : theme.compactAlgorithm,
            }}
        >
            <div>Здесь будет SSR!</div>
        </ConfigProvider>
    );
}

export default App;
