import { allUsers, login, register, setAvatar } from "../controller/user_controller.js";
import express from "express";


export const router = express.Router();
router.get('/', (req, res) => {
    res.send('Server Running')
})

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.post('/api/auth/setAvatar/:id', setAvatar);
router.get('/api/auth/allusers/:id', allUsers);
