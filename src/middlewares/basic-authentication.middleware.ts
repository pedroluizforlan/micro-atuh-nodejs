import {Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/forbidden.error";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(request:Request, response:Response, nextFunctioin:NextFunction){
    try{
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authType, token] = authHeader.split(' ');

        if (authType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválida');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        
        const [username, password] = tokenContent.split(':');

        if(!username || !password){
            throw new ForbiddenError('Credenciais não preenchidas')
        }

        const user = await userRepository.findByUsernameAndPassword(username, password);
        
        if(!user){
            throw new ForbiddenError ('Usuário inválido ou senha iválida')
        }

        request.user = user;
        nextFunctioin();

    } catch (error){
        nextFunctioin(error);            
    }


}

export default basicAuthenticationMiddleware;