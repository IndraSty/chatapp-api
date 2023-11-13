import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/user_routes.js";
import dotenv from "dotenv";
import { msgRouter } from "./routes/messages_routes.js";
import {Server} from 'socket.io';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(router)
app.use(msgRouter)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successfull");
}).catch((err) => {
    console.log(err.message); 
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})