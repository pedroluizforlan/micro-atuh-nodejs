import {Request, Response, NextFunction, Router} from "express";
import ForbiddenError from "../errors/forbidden.error";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import bearerAthenticationMiddleware from "../middlewares/bearer-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware,  async (request: Request, response: Response, nextFunctioin: NextFunction) => {
    try {
        const user = request.user;
        
        if(!user){
            throw new ForbiddenError('Usuário não encontrado')
        }
        
        const jwtPayload = {username: user.username};
        const jwtOptions = {subject : user?.uuid};
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        response.status(StatusCodes.OK).json({token: jwt});

    } catch (error) {
        console.log("erro na hora")
        nextFunctioin(error)
    }
});

authorizationRoute.post('/token/validate', bearerAthenticationMiddleware, async (request: Request, response: Response, nextFunctioin: NextFunction) => {
    response.sendStatus(StatusCodes.OK);
})

export default authorizationRoute;