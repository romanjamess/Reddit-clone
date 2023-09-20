import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { userRouter } from './routes/userRouter.js';

dotenv.config();
const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);




app.use(async (req, res, next) => {
  // check if theres an auth token in header and console it
  try {
    if (!req.headers.authorization) {
      return next();
    }
    const token = req.headers.authorization.split(" ")[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return next();
    }
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Reddit Clone"
  });
});


app.use((error, req, res, next) => {
  res.send({
    success: false,
    error: error.message,
  });
});

app.use((req, res) => {
  res.send({
    success: false,
    error: "No route found.",
  });
});

app.listen(PORT, () =>
  console.log(`App listening on port http://localhost:${PORT}`)
);