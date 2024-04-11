import DatabaseError from "../errors/database.error";
import {StatusCodes} from "http-status-codes";
import {Request, Response, NextFunction} from "express";

function errorHandler(error: any, request: Request, response: Response, nextFunction: NextFunction){
    if(error instanceof DatabaseError){
        response.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;