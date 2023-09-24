import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../server.js";
import bcrypt from "bcrypt";

export const postRouter = express.Router();

postRouter.get(`/`, async (req, res) => {
    const posts = await prisma.post.findMany({
        data: {
            title: true,
            text: true
        }
    })
    res.send({
        success: true,
        posts
    });
});

postRouter.post(`/`, async (req, res) => {
    try { 
        const { title, text, subredditId } = req.body;
        const post = await prisma.post.create({
            data: {
                title, 
                text,
                userId: req.user.id,
                subredditId
            }
        })
        res.send({
            success: true,
            post
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }

});