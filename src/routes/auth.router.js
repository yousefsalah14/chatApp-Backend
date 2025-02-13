import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
import * as authSechema from '../schemas/auth.schema.js'
import { validation } from "../middlewares/validation.middleware.js";
import { isAuthenticated } from "../middlewares/Authentication.middleware.js";
import { fileUpload } from "../utils/fileUpload.js";
const router = Router();
router.post('/signup',validation(authSechema.signup),authController.signup)
router.post('/login',validation(authSechema.login),authController.login)
router.post('/logout',authController.logout)
router.patch('/updatePic',isAuthenticated, fileUpload().single("profilePic"),authController.updatePic)
router.get('/user',isAuthenticated,authController.getUser)
export default router;