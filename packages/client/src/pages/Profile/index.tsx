import React, { useState } from "react";
import { validatePassword } from "../../service/validator";
import {
    Card,
    Typography,
    Row,
    Input,
    Form,
    Button,
    Modal,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import {
    TChangePasswordRequest,
    TChangeProfileRequest,
} from "../../entities/profile/types";
import {
    changeProfile,
    changePassword,
    changeAvatar,
} from "../../entities/profile";
import { useAuthStore } from "../../entities/auth";
import { LockOutlined, UploadOutlined } from "@ant-design/icons";

type TFormChangeProfile = TChangeProfileRequest & {
    avatar: UploadFile;
};

export const Profile: React.FC<object> = () => {
    const me = useAuthStore((state) => state.me);
    const getMe = useAuthStore((state) => state.getMe);
    const signOut = useAuthStore((state) => state.signOut);

    const [fileList, setFileList] = useState<UploadFile[]>(() =>
        me?.avatar
            ? [
                  {
                      url:
                          "https://ya-praktikum.tech/api/v2/resources" +
                          me.avatar,
                      uid: "1",
                      name: "user",
                  },
              ]
            : [],
    );

    const [changePasswordModalOpen, setChangePasswordModalOpen] =
        useState(false);

    const [form] = Form.useForm<TFormChangeProfile>();
    const [changePasswordForm] = Form.useForm<TChangePasswordRequest>();

    const onSubmitProfileChange = async (values: TFormChangeProfile) => {
        const { avatar, ...rest } = values;

        const requests = [changeProfile(rest)];

        if (avatar?.originFileObj) {
            requests.push(changeAvatar(avatar.originFileObj));
        }

        await Promise.all(requests);
        getMe();
    };

    const onSubmitPasswordChange = async (values: TChangePasswordRequest) => {
        changePassword(values);
        setChangePasswordModalOpen(false);
    };

    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        const lastImage = newFileList.at(-1);

        if (!lastImage) {
            setFileList([]);
        } else {
            setFileList([lastImage]);
        }
    };

    return (
        <div>
            <Card>
                <Typography.Title style={{ textAlign: "center" }} level={1}>
                    Профиль
                </Typography.Title>
                <Form
                    form={form}
                    initialValues={me}
                    onFinish={onSubmitProfileChange}
                >
                    <Form.Item
                        name="avatar"
                        label=""
                        getValueFromEvent={(e) => e.fileList?.at(-1)}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            showUploadList={{
                                showDownloadIcon: false,
                                showPreviewIcon: false,
                            }}
                            onChange={handleChange}
                        >
                            <UploadOutlined />
                        </Upload>
                    </Form.Item>
                    <Form.Item name="login" label="Логин">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="display_name" label="Ник">
                        <Input />
                    </Form.Item>
                    <Form.Item name="first_name" label="Имя">
                        <Input />
                    </Form.Item>
                    <Form.Item name="second_name" label="Фамилия">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Телефон">
                        <Input />
                    </Form.Item>
                </Form>
                <Row>
                    <Button onClick={form.submit}>Сохранить</Button>
                </Row>
                <Row>
                    <Button onClick={() => setChangePasswordModalOpen(true)}>
                        Сменить пароль
                    </Button>
                </Row>
                <Row>
                    <Button onClick={() => signOut()}>Выход</Button>
                </Row>
            </Card>

            <Modal
                open={changePasswordModalOpen}
                title="Смена пароля"
                onOk={changePasswordForm.submit}
                onCancel={() => setChangePasswordModalOpen(false)}
            >
                <Form
                    form={changePasswordForm}
                    onFinish={onSubmitPasswordChange}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[{ validator: validatePassword }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Старый пароль"
                        />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ validator: validatePassword }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Новый пароль"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
