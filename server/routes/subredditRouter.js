import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const subredditRouter = express.Router();
const prisma = new PrismaClient();

subredditRouter.post(`/`, async (req, res) => {
    try {
      
        const { name } = req.body;
        const subreddit = await prisma.subreddit.create({
            data: {
                name,
                userId: req.user.id,
            }
        }) 
     
        res.send({
            success: true,
            subreddit
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
              
        });
    } console.log(subreddit);

});