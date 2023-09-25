import express from "express";
import { prisma } from "../server.js";

export const likeRouter = express.Router(); 

likeRouter.post("/upvotes/:postId", async (req, res) => {
   const { postId } = req.params; 

   try {
    const upVote = await prisma.upVotes.create({
        data: {
            postId, 
            userId: req.user.id 
        }
    })
    res.send({
        success: true, 
        upVote
    })
   }catch(error){
    res.send({ success: false, error: error.message})
   }
});

likeRouter.delete("/upvotes/:postId", async (req, res) => {
        const { postId } = req.params;

        try {
            const downVote = await prisma.downVotes.delete({
                where: {
                    postId,
                    userId: req.user.id
                }
            })
            res.send({
                success: true,
                downVote
            })
        } catch (error) {
            res.send({ success: false, error: error.message })
        }
})