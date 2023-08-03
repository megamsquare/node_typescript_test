import express from 'express';
import Auth_controller from '../controllers/auth.controller';
import { validateSignIn } from '../dto/obj/auth.dto';
import Middleware from '../middleware';

const router = express.Router();

router.post('/signUp', validateSignIn, Middleware.ValidationResponse.validateResult, Auth_controller.signUp);
router.post('/signIn', Middleware.ValidationResponse.validateResult, Auth_controller.signIn);
router.post('/refresh', Auth_controller.refreshToken);
router.post('/forgottenPassword', Auth_controller.forgot_password);

export default router;