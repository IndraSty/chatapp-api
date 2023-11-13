import express from "express";
import { addMessage, getAllMessage } from "../controller/messages_controller.js";


export const msgRouter = express.Router();

msgRouter.post('/api/messages/addmsg', addMessage);
msgRouter.post('/api/messages/getmsg', getAllMessage);
