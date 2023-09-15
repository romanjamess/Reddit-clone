import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { API } from './assets/index.js';


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
    if (!user) {
        return res.send({ success: false, error: "No user found." });
    }
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