import { NewUser, UpdatePassword, UpdateUser } from "../dto/obj/user.dto";
import Model from "../models";
import Err from "../dto/error_dto";
import { IUser } from "../models/users.model";
import { Types } from "mongoose";

async function createUser(user: NewUser): Promise<IUser & { _id: Types.ObjectId } | Error> {
    try {
        const userModel = Model.User;

        const emailExist = await userModel.exists({ email: user.email });
        if (emailExist) {
            throw new Error(Err.EmailExists);
        }

        const usernameExist = await userModel.exists({ username: user.username });
        if (usernameExist) {
            throw new Error(Err.UsernameExists)
        }

        const saveUser = await userModel.create({ ...user })

        return saveUser;
    } catch (error) {
        return error as Error;
    }
}

async function getUserById(userId: string) {
    try {
        const userModel = Model.User;
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            throw new Error(Err.UserDoesNotExists);
        }

        return user;
    } catch (error) {
        return error as Error
    }
}

async function updateUser(userInfo: UpdateUser) {
    try {
        if (!userInfo.userId || userInfo.userId === "") {
            throw new Error(Err.InvalidUserId);
        }

        const update = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            username: userInfo.username
        }
        const userModel = Model.User;
        const userUpdate = await userModel.findOneAndUpdate(
            { _id: userInfo.userId },
            update,
            { new: true }
        );

        return userUpdate;
    } catch (error) {
        return error as Error;
    }
}

async function changeUserPassword(updatePassword: UpdatePassword) {
    if (!updatePassword.userId || updatePassword.userId === "") {
        throw new Error(Err.InvalidUserId);
    }

    const update = {
        password: updatePassword.password
    }

    const userModel = Model.User;
    const passwordUpdate = await userModel.findOneAndUpdate(
        { _id: updatePassword.userId},
        update,
        {new :true}
    )

    return passwordUpdate;
}

const UserService = {
    createUser,
    getUserById,
    updateUser,
    changeUserPassword
}

export default UserService;