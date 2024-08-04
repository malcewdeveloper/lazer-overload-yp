import React from "react";
import { Flex, Layout, Typography } from "antd";
import CanvasGame from "./CanvasGame";
import classes from "./Game.module.scss";

const { Content } = Layout;

export const Game: React.FC<object> = () => {
    return (
        <Layout className={classes.root}>
            <Content>
                <Typography.Title level={1} className={classes.title}>
                    Game
                </Typography.Title>
                <Flex align="center" justify="center">
                    <CanvasGame />
                </Flex>
            </Content>
        </Layout>
    );
};
