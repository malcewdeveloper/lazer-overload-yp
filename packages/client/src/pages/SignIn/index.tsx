import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { history, routes } from "../../service";
import { validateLogin, validatePassword } from "../../service/validator";
import classes from "./SignIn.module.scss";
import { useAuthStore } from "../../entities/auth";

type TForm = {
    login: string;
    password: string;
};

export const SingIn: React.FC<object> = () => {
    const [clientId, setClientId] = useState<string>();

    const signIn = useAuthStore((state) => state.signIn);
    const getClientId = useAuthStore((state) => state.getClientId);
    const redirect_uri = useAuthStore((state) => state.redirect_uri);

    const onFinish = async (values: TForm) => {
        try {
            await signIn(values);
            history.push("/");
        } catch (error) {
            void 0;
        }
    };

    useEffect(() => {
        getClientId().then((res) => {
            setClientId(res.data.service_id);
        });
    }, []);

    const OAuthHref = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirect_uri}`;

    return (
        <Flex
            align="center"
            justify="center"
            vertical={true}
            className={classes.root}
        >
            <Typography.Title className={classes.title} level={1}>
                Lazer Overload
            </Typography.Title>
            <Typography.Title className={classes.title} level={2}>
                Вход
            </Typography.Title>
            <Form
                name="normal_login"
                className={classes.form}
                size="large"
                onFinish={onFinish}
            >
                <Form.Item
                    name="login"
                    style={{ marginBottom: "16px" }}
                    rules={[{ validator: validateLogin }]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Логин"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    style={{ marginBottom: "16px" }}
                    rules={[{ validator: validatePassword }]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        data-testid="submit_btn"
                    >
                        Log in
                    </Button>
                    &nbsp;Or&nbsp;
                    <Link to={routes.singUp.path}>register now!</Link>
                    <br />
                    <Typography.Link disabled={!clientId} href={OAuthHref}>
                        OAuth авторизация
                    </Typography.Link>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default SingIn;
