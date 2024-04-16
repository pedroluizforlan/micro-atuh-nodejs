import DatabaseError from "../errors/database.error";
import {StatusCodes} from "http-status-codes";
import {Request, Response, NextFunction} from "express";
import ForbiddenError from "../errors/forbidden.error";

function errorHandler(error: any, request: Request, response: Response, nextFunction: NextFunction){
    if(error instanceof DatabaseError){
        response.sendStatus(StatusCodes.BAD_REQUEST);
    } else if(error instanceof ForbiddenError) {
        response.sendStatus(StatusCodes.FORBIDDEN);
    } else {
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;