import { Button, List } from "antd";
import { routes } from "../../../service";
import { generatePath } from "react-router-dom";
import { data } from "../mocks";

export const PostList: React.FC = () => {
    const createPost = () => {
        const link = generatePath(routes.post.path, { postId: "new" });
        // history.push(link);
    };

    const openPost = (postId: number) => {
        const link = generatePath(routes.post.path, { postId });
        // history.push(link);
    };

    return (
        <>
            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={createPost}
            >
                New Post
            </Button>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            title={
                                <span onClick={() => openPost(item.id)}>
                                    {item.title}
                                </span>
                            }
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};
