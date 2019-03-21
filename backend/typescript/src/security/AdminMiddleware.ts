import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from 'express';
import { provide } from "inversify-binding-decorators";
import { UNAUTHORIZED } from "http-status-codes";
import { Role } from "../enums/Role";

@provide(AdminMiddleware)
export default class AdminMiddleware extends BaseMiddleware {

    /**
     * BaseMiddleware method for inversify-express-utils. Check http session authorization
     * @param {Response} res - express socket response.
     * @param {Request} req - express socket request.
     * @param {NextFunction} next - next request handler function.
     */
    public handler(req, res, next) {
        if (req.isAuthenticated() && req.user.role == Role.ADMIN) {
            return next()
        } else {
            res.sendStatus(UNAUTHORIZED);
        }
    }

}
