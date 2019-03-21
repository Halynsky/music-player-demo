import CustomError from "./CustomError";
import { CONFLICT } from "http-status-codes";

export default class ConflictError extends CustomError {
    status: number = CONFLICT
}
