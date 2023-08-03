import express from 'express';
import Auth_controller from '../controllers/auth.controller';
import { validateSignIn } from '../dto/obj/auth.dto';
import Middleware from '../middleware';
import { validateNewUser } from '../dto/obj/user.dto';

const router = express.Router();

router.post('/signUp', validateNewUser, Middleware.ValidationResponse.validateResult, Auth_controller.signUp);
router.post('/signIn', validateSignIn, Middleware.ValidationResponse.validateResult, Auth_controller.signIn);
router.post('/refresh', Auth_controller.refreshToken);
router.post('/forgottenPassword', Auth_controller.forgot_password);

export default router;