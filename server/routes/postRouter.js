import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const postRouter = express.Router();
const prisma = new PrismaClient();

postRouter.get(`/`, async (req, res) => {
    const posts = await prisma.post.findMany({
        data: {
            title: true,
            content: true,
            published: true,
        }
    })
    res.send({
        success: true,
        posts
    });
});

postRouter.post(`/`, async (req, res) => {
    
});