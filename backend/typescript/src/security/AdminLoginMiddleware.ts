import { BaseMiddleware } from "inversify-express-utils";
import { logger } from "../utils/Util";
import * as express from 'express';
import * as passport from 'passport';
import { inject } from "inversify";
import { Request } from "express";
import { NextFunction } from "express";
import TYPES from "../utils/Types";
import { provide } from "inversify-binding-decorators";
import { OK, UNAUTHORIZED } from "http-status-codes";
import UserRepository from "../repositories/UserRepository";

@provide(AdminLoginMiddleware)
export default class AdminLoginMiddleware extends BaseMiddleware {

    @inject(TYPES.UserRepository) private userRepository: UserRepository;

    /**
     * BaseMiddleware method for inversify-express-utils. Check http session authorization
     * @param {Response} res - express socket response.
     * @param {Request} req - express socket request.
     * @param {NextFunction} next - next request handler function.
     */
    public handler(
        req: Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        passport.authenticate('admin',
            (err, user, info) => {
                if (err) return next(err);
                if (!user) return res.sendStatus(UNAUTHORIZED);
                req.logIn(user, (err) => {
                    if (err) return next(err);
                    logger.info(user.name + " is Logged in");
                    return res.status(OK).send();
                });
            })(req, res, next);
    }

}
