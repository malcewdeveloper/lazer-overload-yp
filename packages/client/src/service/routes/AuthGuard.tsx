import React, { PropsWithChildren, useLayoutEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { routes } from "./routeMap";
import { useAuthStore } from "../../entities/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { NotificationApi } from "..";
import { isAxiosError } from "axios";

export const AuthGuard: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const me = useAuthStore((state) => state.me);

    const getMe = useAuthStore((state) => state.getMe);

    useLayoutEffect(() => {
        if (me || loading) return;

        setLoading(true);
        getMe()
            .catch((error) => {
                const link = generatePath(routes.signIn.path);
                // history.push(link);

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
    }, [me, loading]);

    if (me) {
        return children;
    } else if (loading) {
        return <LoadingOutlined />;
    } else {
        return null;
    }
};
