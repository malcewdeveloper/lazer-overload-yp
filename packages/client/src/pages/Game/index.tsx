import React from "react";
import { Flex, Layout, Typography } from "antd";
import CanvasGame from "./CanvasGame";
import classes from "./Game.module.scss";

const { Content } = Layout;
import { ITheme, useTheme } from "../../entities/theme";
import { ButtonChangeTheme } from "../../components/ButtonChangeTheme";

export const Game: React.FC<object> = () => {
    const isDark = useTheme((state: ITheme) => state.isDark);
    console.log("isDark?", isDark);
    return (
        <div
            style={{
                height: "30vh",
                width: "100vw",
                color: isDark ? "#fff" : "#111827",
                backgroundColor: isDark ? "#111827" : "#fff",
            }}
        >
            <Layout className={classes.root}>
                <ButtonChangeTheme />

                <Content>
                    <Typography.Title level={1} className={classes.title}>
                        Game
                    </Typography.Title>
                    <Flex align="center" justify="center">
                        <CanvasGame />
                    </Flex>
                </Content>
            </Layout>
        </div>
    );
};
