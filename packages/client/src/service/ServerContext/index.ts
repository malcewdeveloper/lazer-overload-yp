import { getCookie } from "../../utils";

export const createContext = (): PageInitContext => ({
    clientToken: getCookie("token"),
});
