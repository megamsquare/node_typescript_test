import express from 'express';
import Auth_controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/signUp', Auth_controller.signUp);
router.post('/signIn', Auth_controller.signIn);
router.post('/refresh', Auth_controller.refreshToken);
router.post('/forgottenPassword', Auth_controller.forgot_password);

export default router;