import express from "express";
import { prisma } from "../server.js";

export const subredditRouter = express.Router();

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
    } 
});

subredditRouter.get("/", async (req, res) => {
    try {
      const subreddit = await prisma.subreddit.findMany();
      const data = {
        success: true,
        subreddit,
      };
      res.json({ data });
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  });
  