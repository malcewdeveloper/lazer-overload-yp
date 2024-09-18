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
import { useUserStore } from "./entities/user";
import "./App.css";

function App() {
    const isDark = Math.random() > 0.5;
    const user = useUserStore((state) => state.data);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? theme.darkAlgorithm
                    : theme.compactAlgorithm,
            }}
        >
            {user ? (
                <div>
                    <p>{user.name}</p>
                    <p>{user.secondName}</p>
                </div>
            ) : (
                <p>Пользователь не найден!</p>
            )}
        </ConfigProvider>
    );
}

export default App;
