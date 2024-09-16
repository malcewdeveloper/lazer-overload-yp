import React, { PropsWithChildren, useLayoutEffect, useState } from "react";
import { generatePath, useHistory, useLocation } from "react-router-dom";
import { routes } from "./routeMap";
import { useAuthStore } from "../../entities/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { NotificationApi } from "..";
import { isAxiosError } from "axios";

export const AuthGuard: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const me = useAuthStore((state) => state.me);

    const { search } = useLocation();
    const history = useHistory();

    const getMe = useAuthStore((state) => state.getMe);

    useLayoutEffect(() => {
        if (me || loading) return;

        // TODO: убрать это дерьмо после того как пойму почему не работает
        // редирект урл
        const query = new URLSearchParams(search);
        const code = query.get("code");

        if (code && typeof code === "string") {
            history.replace(routes.OAuth.path + search);
        } else {
            setLoading(true);
            getMe()
                .catch((error) => {
                    const link = generatePath(routes.signIn.path);
                    history.push(link);

                    if (isAxiosError(error)) {
                        NotificationApi.open({
                            title: "Что-то пошло не так",
                            body: error.response?.data?.reason,
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [me, loading, search]);

    if (me) {
        return children;
    } else if (loading) {
        return <LoadingOutlined />;
    } else {
        return null;
    }
};
