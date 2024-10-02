import express, { Request, Response } from "express";

import { Comment, data } from "./topics";

const router = express.Router();

router.get("/:topicId", (req: Request, res: Response) => {
    const { topicId } = req.params;
    const topic = data.topics.find((t) => t.id === parseInt(topicId, 10));
    if (topic) {
        res.json(data.comments[parseInt(topicId, 10)] || []);
    } else {
        res.status(404).json({ error: "Topic not found" });
    }
});

router.post("/:topicId", (req: Request, res: Response) => {
    const { topicId } = req.params;
    const { comment, author, date, replyToId } = req.body;
    const normalizedTopicId = parseInt(topicId, 10);
    if (!data.comments[normalizedTopicId]) {
        data.comments[normalizedTopicId] = [];
    }
    const newComment: Comment = {
        id: data.comments[normalizedTopicId].length + 1,
        comment,
        author,
        date,
        topicId: parseInt(topicId, 10),
        replyToId,
    };

    data.comments[parseInt(topicId, 10)].push(newComment);
    res.status(201).json(newComment);
});

router.delete("/:topicId/:commentId", (req: Request, res: Response) => {
    const { topicId, commentId } = req.params;
    if (data.comments[parseInt(topicId, 10)]) {
        data.comments[parseInt(topicId, 10)] = data.comments[
            parseInt(topicId, 10)
        ].filter((comment) => comment.id !== parseInt(commentId, 10));
    }
    res.status(204).send();
});

export default router;
