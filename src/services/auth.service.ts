import Model from "../models";
import Err from "../dto/error_dto";
import jwt from "jsonwebtoken";
import { LoginInfo, AccessTokenCheck, ForgottenPassword } from "../dto/obj/auth.dto";

async function loginUserCheck(loginInfo: LoginInfo) {
    try {
        const userModel = Model.User;

        if (!loginInfo.usernameOrEmail || !loginInfo.password) {
            throw new Error(Err.ProvideLoginDetails);
        }

        const user = await userModel.findOne({
            $or: [{ username: loginInfo.usernameOrEmail }, { email: loginInfo.usernameOrEmail }]
        })

        if (!user) {
            throw new Error(Err.InvalidUsernameOrEmail);
        }

        const isPassword = await user.compare_password(loginInfo.password);
        if (!isPassword) {
            throw new Error(Err.IncorrectPassword);
        }

        return user;

    } catch (error) {

    }
}

function validateUserAccessToken(accessToken: AccessTokenCheck) {
    try {
        const { header, checkExpire } = accessToken;
        let payload: jwt.JwtPayload;
        if (!header || !header.startsWith('Bearer')) {
            throw new Error(Err.Unauthentication);
        }

        let userToken = header.split(' ')[1];
        const refreshKey = process.env.JWT_SECRET_KEY || '';

        if (!checkExpire) {
            payload = jwt.verify(userToken, refreshKey) as jwt.JwtPayload;
        } else {
            payload = jwt.verify(userToken, refreshKey) as jwt.JwtPayload;
        }

        return payload

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error(error.message)
        }
        return error as Error
    }
}

async function forgetPassword(forgottenPassword:ForgottenPassword) {
    if (!forgottenPassword.email || forgottenPassword.email === "") {
        throw new Error(Err.InvalidEmail);
    }

    const userModel = Model.User;

    const user = await userModel.findOne({ email: forgottenPassword.email });

    if (!user) {
        throw new Error(Err.UserDoesNotExists)
    }

    const isPassword = await user.compare_password(forgottenPassword.oldPassword);
    if (!isPassword) {
        throw new Error(Err.IncorrectPassword);
    }

    user.password = forgottenPassword.newPassword;

    await user.save();

    return user;
}

const AuthService = {
    loginUserCheck,
    validateUserAccessToken
}

export default AuthService;