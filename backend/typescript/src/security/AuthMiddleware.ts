import { BaseMiddleware } from "inversify-express-utils";
import { Request, Response, NextFunction } from 'express';
import { provide } from "inversify-binding-decorators";
import { UNAUTHORIZED } from "http-status-codes";

@provide(AuthMiddleware)
export default class AuthMiddleware extends BaseMiddleware {

    /**
     * BaseMiddleware method for inversify-express-utils. Check http session authorization
     * @param {Response} res - express socket response.
     * @param {Request} req - express socket request.
     * @param {NextFunction} next - next request handler function.
     */
    public handler(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.sendStatus(UNAUTHORIZED);
        }
    }

}
