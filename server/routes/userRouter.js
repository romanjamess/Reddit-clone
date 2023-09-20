import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const userRouter = express.Router();
const prisma = new PrismaClient();


userRouter.get(`/`, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.send({
            success: true,
            users
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }

});

userRouter.delete(`/:userId`, async (req, res) => {
    try {
        const userId = (req.params.userId);
        const findUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!findUser) {
            return res.send({
                success: false,
                error: "User not found",
            });
        }

        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        res.send({
            success: true,
            user
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

userRouter.post(`/register`, async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.send({
                success: false,
                error: "You must provide a username and password when logging in.",
            });
        }
        const checkUser = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (checkUser) {
            return res.send({
                success: false,
                error: "User already exists",
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.send({
            success: true,
            token
        });
        // console.log("userCreated:", user);
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});


userRouter.post(`/login`, async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.send({
                success: false,
                error: "You must provide a username and password when logging in.",
            });
        }
        // Find the user by username
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            return res.send({
                success: false,
                error: "Invalid username or password",
            });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Token expiration time (adjust as needed)
            });

            res.send({
                success: true,
                token,
            });
        } else {
            res.send({
                success: false,
                error: "Invalid username or password",
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
        });
    }
});

userRouter.get("/token", async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return next();
        }
        // console.log(req.headers.authorization);
        // how can i see the token in my console here
        // that the user sent
        const token = req.headers.authorization.split(" ")[1];
        // how do i verify and decode this token?
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("userID", userId);
        // where is user info stored and how do i ask for it?
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        delete user.password;
        res.send({
            success: true,
            user,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
});
