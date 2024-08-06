import React, { useState } from "react";
import { useAuthStore } from "../../entities/profile";
import { validatePassword } from "../../service/validator";
import {
    Card,
    Avatar,
    Space,
    Modal,
    Typography,
    Col,
    Row,
    Input,
    Form,
    Button,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

type TForm = {
    oldPassword: string;
    newPassword: string;
};

const { Text } = Typography;

export const Profile: React.FC<object> = () => {
    // const signIn = useAuthStore((state) => state.signIn);

    const onPasswordFinish = async (values: TForm) => {
        console.log(values);
        setIsChangePassModalOpen(false);
        // try {
        //     await signIn(values);
        //     history.push("/");
        // } catch (error) {
        //     void 0;
        // }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangeAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showChangeAvatarModal = () => {
        setIsAvatarModalOpen(true);
    };

    const showChangePassModal = () => {
        setIsChangePassModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handChangeAvatarOk = () => {
        setIsAvatarModalOpen(false);
    };

    const handChangeAvatarCancel = () => {
        setIsAvatarModalOpen(false);
    };

    const handleChangePassCancel = () => {
        setIsChangePassModalOpen(false);
    };

    return (
        <div
            style={{
                boxShadow: "0px 0px 12px #444",
                width: "400px",
                height: "auto",
                display: "flex",
                margin: "0 auto",
                flexDirection: "column",
            }}
        >
            <Card
                cover={
                    <Space
                        style={{ textAlign: "center" }}
                        direction="vertical"
                        size={16}
                    >
                        <Space wrap size={16}>
                            <Avatar
                                style={{ margin: "10px", textAlign: "center" }}
                                size={164}
                                icon={<UserOutlined />}
                            />
                        </Space>
                    </Space>
                }
            >
                <Typography.Title style={{ textAlign: "center" }} level={1}>
                    Профиль
                </Typography.Title>

                <Row>
                    <Col span={12}>
                        {" "}
                        <Text strong>Логин:</Text>
                    </Col>
                    <Col span={12}>Иван</Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {" "}
                        <Text strong>Имя:</Text>
                    </Col>
                    <Col span={12}>Иван</Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {" "}
                        <Text strong>Фамилия:</Text>
                    </Col>
                    <Col span={12}>Иванов</Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {" "}
                        <Text strong>Электронная почта:</Text>
                    </Col>
                    <Col span={12}>Ivan@test.ru</Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {" "}
                        <Text strong>Номер телефона:</Text>
                    </Col>
                    <Col span={12}>9876543210</Col>
                </Row>
                {
                    <Row>
                        <Text
                            style={{ color: "#3369f3", cursor: "pointer" }}
                            onClick={showChangeAvatarModal}
                        >
                            Изменить аватар
                        </Text>
                        <Modal
                            width={400}
                            style={{ textAlign: "center" }}
                            title="Изменение аватара профиля"
                            open={isChangeAvatarModalOpen}
                            onOk={handChangeAvatarOk}
                            onCancel={handChangeAvatarCancel}
                        >
                            <Form>
                                <Input type="file"></Input>
                            </Form>
                        </Modal>
                    </Row>
                }
                <Row>
                    <Text
                        style={{ color: "#3369f3", cursor: "pointer" }}
                        onClick={showChangePassModal}
                    >
                        Изменить пароль
                    </Text>
                    <Modal
                        width={400}
                        style={{ textAlign: "center" }}
                        title="Изменение пороля пользователя"
                        open={isChangePassModalOpen}
                        footer={null}
                        onCancel={handleChangePassCancel}
                    >
                        <Form
                            name="normal_login"
                            size="large"
                            onFinish={onPasswordFinish}
                        >
                            <Form.Item
                                name="oldPassword"
                                style={{ marginBottom: "16px" }}
                                rules={[{ validator: validatePassword }]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Старый пароль"
                                />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                style={{ marginBottom: "16px" }}
                                rules={[{ validator: validatePassword }]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Новый пароль"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Сменить
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Row>
                <Row>
                    <Text
                        style={{ color: "#ff0000", cursor: "pointer" }}
                        onClick={showModal}
                    >
                        Выход
                    </Text>
                    <Modal
                        width={400}
                        style={{ textAlign: "center" }}
                        title="Выйти из профиля?"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    ></Modal>
                </Row>
            </Card>
        </div>
    );
};
