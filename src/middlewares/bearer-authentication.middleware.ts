import {Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/forbidden.error";
import JWT from "jsonwebtoken";


async function bearerAthenticationMiddleware(request: Request, response: Response, nextFunctioin: NextFunction){

    try {
        const authHeader = request.headers['authorization'];

        if(!authHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        try{
            const tokenPayload = JWT.verify(token, 'my_secret_key');

            if(typeof tokenPayload !== 'object' || !tokenPayload.sub ){
                throw new ForbiddenError('Token Inválido')
            }
    
            const uuid = tokenPayload.sub;
            const user = {
                uuid:  tokenPayload.sub,
                username:  tokenPayload.username
            };
    
            request.user = user;
            nextFunctioin();
        }catch(error){
            throw new ForbiddenError("Token Inválido")
        }
    } catch (error) {
        nextFunctioin(error);
    }
}

export default bearerAthenticationMiddleware;