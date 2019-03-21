import CustomError from "./CustomError";
import { FORBIDDEN } from "http-status-codes";

export default class ForbiddenError extends CustomError {
    status: number = FORBIDDEN
}
