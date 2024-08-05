import React, { useState } from "react";
import { Link } from "react-router-dom";
import { history, routes } from "../../service";
import {
    Card,
    Button,
    Avatar,
    Space,
    Modal,
    Typography,
    Col,
    Row,
    Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const Profile: React.FC<object> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangeDataModalOpen, setIsDataModaModalOpen] = useState(false);
    const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showChangeDataModal = () => {
        setIsDataModaModalOpen(true);
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

    const handChangeDataleOk = () => {
        setIsDataModaModalOpen(false);
    };

    const handChangeDataleCancel = () => {
        setIsDataModaModalOpen(false);
    };
    const handleChangePassOk = () => {
        setIsChangePassModalOpen(false);
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
                <Row>
                    <Text
                        style={{ color: "#3369f3", cursor: "pointer" }}
                        onClick={showChangeDataModal}
                    >
                        Изменить данные
                    </Text>
                    <Modal
                        width={400}
                        style={{ textAlign: "center" }}
                        title="Изменение данных профиля"
                        open={isChangeDataModalOpen}
                        onOk={handChangeDataleOk}
                        onCancel={handChangeDataleCancel}
                    >
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Логин:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input placeholder="Иван" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Имя:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input placeholder="Иван" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Фамилия:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input placeholder="Иванов" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Электронная почта:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input placeholder="Ivan@test.ru" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Номер телефона:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input placeholder="9876543210" />
                            </Col>
                        </Row>
                    </Modal>
                </Row>
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
                        onOk={handleChangePassOk}
                        onCancel={handleChangePassCancel}
                    >
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Пароль:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input.Password
                                    placeholder="input password"
                                    //   visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: "left" }}>
                                {" "}
                                <Text strong>Повторите пароль:</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "left" }}>
                                <Input.Password
                                    placeholder="input password"
                                    //   visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                />
                            </Col>
                        </Row>
                    </Modal>
                </Row>
                <Row>
                    <Text
                        style={{ color: "#ff0000", cursor: "pointer" }}
                        onClick={showModal}
                    >
                        Выйти
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
