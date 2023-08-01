import AuthMiddleware from "./auth.middleware";
import NotFoundMiddleware from "./not_found.middleware";
import ValidationResponse from "./validation.middleware";

const Middleware = {
    AuthMiddleware,
    NotFoundMiddleware,
    ValidationResponse
}

export default Middleware;