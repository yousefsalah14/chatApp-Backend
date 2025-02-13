import { Router } from "express";
import { isAuthenticated } from "../middlewares/Authentication.middleware.js";
import * as messageController from '../controllers/message.controller.js'
import { fileUpload } from "../utils/fileUpload.js";
const router = Router();
router.get("/users",isAuthenticated,messageController.getUsers)
router.get('/:id',isAuthenticated,messageController.getMessages)
router.post('/send/:id',isAuthenticated,fileUpload().single("img"),messageController.sendMessage)
export default router;