import { INTERNAL_SERVER_ERROR } from "http-status-codes";

export default class CustomError extends Error {
    status: number = INTERNAL_SERVER_ERROR;
}
