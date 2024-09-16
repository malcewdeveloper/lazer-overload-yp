import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";

export const OAuthRedirect = () => {
    const { search } = useLocation();
    const signInOAuth = useAuthStore((store) => store.signInOAuth);

    useLayoutEffect(() => {
        const query = new URLSearchParams(search);
        const code = query.get("code");

        if (code) {
            signInOAuth(code);
        }
    }, []);

    return null;
};
