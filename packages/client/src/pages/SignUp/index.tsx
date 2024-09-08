import React from "react";
import { Flex, Form, Input, Typography, Button, notification } from "antd";
import { Link } from "react-router-dom";
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import { routes } from "../../service";
import {
    validateEmail,
    validateLogin,
    validatePassword,
    validatePhone,
    validateName,
} from "../../service/validator";
import classes from "./SignUp.module.scss";
import { useAuthStore } from "../../entities/auth";

type TForm = {
    confirm: string;
    password: string;
    email: string;
    login: string;
    phone: string;
    second_name: string;
    first_name: string;
};

export const SingUp: React.FC<object> = () => {
    const signUp = useAuthStore((state) => state.signUp);

    const onFinish = async (values: TForm) => {
        const { confirm, ...rest } = values;
        try {
            await signUp(rest);
            // history.push("/");
        } catch (error) {
            void 0;
        }
    };

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
                Регистрация
            </Typography.Title>
            <Form<TForm>
                name="register"
                onFinish={onFinish}
                className={classes.form}
                size="large"
            >
                <Form.Item
                    rules={[{ validator: validateName }]}
                    name="first_name"
                >
                    <Input prefix={<UserOutlined />} placeholder="Имя" />
                </Form.Item>
                <Form.Item
                    rules={[{ validator: validateName }]}
                    name="second_name"
                >
                    <Input prefix={<UserOutlined />} placeholder="Фамилия" />
                </Form.Item>
                <Form.Item rules={[{ validator: validatePhone }]} name="phone">
                    <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Номер телефона"
                    />
                </Form.Item>
                <Form.Item rules={[{ validator: validateLogin }]} name="login">
                    <Input prefix={<UserOutlined />} placeholder="Логин" />
                </Form.Item>
                <Form.Item rules={[{ validator: validateEmail }]} name="email">
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Электронная почта"
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ validator: validatePassword }]}
                    name="password"
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        { validator: validatePassword },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Пароли не совпадают"),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Подтверждение пароля"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    &nbsp;Or&nbsp;
                    <Link to={routes.signIn.path}>login now!</Link>
                </Form.Item>
            </Form>
        </Flex>
    );
};
