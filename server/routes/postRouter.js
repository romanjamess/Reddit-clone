import express from "express";
import { prisma } from "../server.js";

export const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                subreddit: true,
                upvotes: true,
                downvotes: true,
            },
        });
        const data = {
            success: true,
            posts,
        };
        res.json({ data });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});


postRouter.post("/", async (req, res) => {
    try {
        const { title, text, subredditId } = req.body;
        const post = await prisma.post.create({
            data: {
                title,
                text,
                userId: req.user.id,
                subredditId
            }
        });
        res.send({
            success: true,
            post,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});