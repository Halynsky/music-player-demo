import { provide } from "inversify-binding-decorators";
import TYPES from "./Types";
import * as express from "express";
import { jsonError, logger } from "./Util";
import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import CustomError from "../errors/CustomError";

@provide(TYPES.ErrorHandler)
export class ErrorHandler {
    handleInternalError = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        logger.error(err);
        if (err instanceof CustomError)
            res.status(err.status).json(jsonError(err.message));
        else
            res.status(INTERNAL_SERVER_ERROR).json(jsonError(err.message));
    };

}
