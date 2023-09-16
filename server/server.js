import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient()

app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to Reddit Clone"
    });
});

app.get(`/users`, async (req, res) => {
  
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

app.post(`/users/register`, async (req, res) => {
    const { username, password } = req.body;
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

    try {
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
        console.log("userCreated:", user);
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});



app.get(`/users/:userId`, async (req, res) => {
    const userId = (req.params.userId);
    if (!userId) {
        return res.send({
            success: false,
            error: "User not found",
        });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        res.send({
            success: true,
            user
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

app.delete(`/users/:userId`, async (req, res) => {
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

    try {
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


app.use((error, req, res, next) => {
    res.send({
        success: false,
        errror: error.message,
    });
});

app.use((req, res) => {
    res.send({
        success: false,
        errror: "No route found.",
    });
});

app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
);