import { sequelize } from "../../db";
import { DataTypes } from "sequelize";

export const UserThemeModel = sequelize.define(
    "user_theme",
    {
        themeId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    },
);
