import { BaseMiddleware } from "inversify-express-utils";
import { logger } from "../utils/Util";
import * as express from 'express';
import * as passport from 'passport';
import { inject } from "inversify";
import { Request } from "express";
import { NextFunction } from "express";
import { MemoryStore } from "express-session";
import TYPES from "../utils/Types";
import { provide } from "inversify-binding-decorators";
import { OK, UNAUTHORIZED } from "http-status-codes";
import UserRepository from "../repositories/UserRepository";
import SessionRepository from "../repositories/SessionRepository";

@provide(PasswordLoginMiddleware)
export default class PasswordLoginMiddleware extends BaseMiddleware {

    @inject(TYPES.UserRepository) private userRepository: UserRepository;
    @inject(TYPES.SessionRepository) private sessionRepository: SessionRepository;

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
        passport.authenticate('local',
            (err, user, info) => {
                if (err) return next(err);
                if (!user) return res.sendStatus(UNAUTHORIZED);

              // Destroy other session of User if it exist
              this.sessionRepository.deleteOtherSessions(user.id, req.sessionID);

                let memoryStore: MemoryStore = (req as any).sessionStore;
                memoryStore.all((err, session) => {
                    if (err) return next(err);
                    let sessionId = Object.keys(session)[0];
                    if (sessionId && session[sessionId].passport.user == user.id) {
                        memoryStore.destroy(sessionId)
                    }
                });

                req.logIn(user, (err) => {
                    if (err) return next(err);
                    logger.info(user.name + " is Logged in");
                    delete user.password;
                    return res.status(OK).send();
                });
            })(req, res, next);
    }

}
