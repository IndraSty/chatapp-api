import { Messages } from "../model/chat_model.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({ msg: "Message added successfully" })
        return res.json({ msg: "Failed to add message" });
    } catch (e) {
        next(e);
    }
}

export const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updateAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        res.json(projectMessages)
    } catch (e) {
        next(e);
    }
}