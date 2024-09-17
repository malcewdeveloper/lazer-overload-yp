import { ITheme, useTheme } from "../../entities/theme";
import button from "./button.module.scss";
import { LuSunDim } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";

export const ButtonChangeTheme = () => {
    const isDark = useTheme((state: ITheme) => state.isDark);
    const changeColor = useTheme((state: ITheme) => state.changeTheme);
    const icon = isDark ? (
        <FiMoon className={button.btn} onClick={changeColor} />
    ) : (
        <LuSunDim className={button.btn} onClick={changeColor} />
    );
    return icon;
};
