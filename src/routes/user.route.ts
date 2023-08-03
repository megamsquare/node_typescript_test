import express from 'express';
import userController from '../controllers/user.controller';
import { validateNewUser } from '../dto/obj/user.dto';
import Middleware from '../middleware';

const routers =  express.Router();

routers.post('/createUser', validateNewUser, Middleware.ValidationResponse.validateResult, userController.createUser);
routers.put('/updateUser', userController.updateUser)

// Export the rtouter
export default routers;