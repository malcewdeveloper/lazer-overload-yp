import React, { useState } from "react";
import { Flex, Layout, Typography, Button } from "antd";
import CanvasGame from "./CanvasGame";
import classes from "./Game.module.scss";
import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons";

const { Content } = Layout;
import { ButtonChangeTheme } from "../../components/ButtonChangeTheme";

export const Game: React.FC<object> = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <Layout className={classes.root}>
            <ButtonChangeTheme />

            <Content>
                <Typography.Title level={1} className={classes.title}>
                    Game
                </Typography.Title>

                <Button
                    className={classes.button}
                    onClick={() => handleFullscreen()}
                >
                    {isFullscreen ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                </Button>

                <Flex align="center" justify="center">
                    <CanvasGame />
                </Flex>
            </Content>
        </Layout>
    );
};
