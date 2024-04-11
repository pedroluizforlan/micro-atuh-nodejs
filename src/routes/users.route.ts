import {Response, Request, NextFunction, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import userRepository from "../repositories/user.repository";
import DatabaseError from "../errors/database.error";

const usersRoute = Router();

usersRoute.get('/users', async (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
        const users = await userRepository.findAllUsers();
        response.status(StatusCodes.OK).send(users);
    } catch (error) {
        nextFunction(error);
    }
});

usersRoute.get('/users/:uuid', async (request: Request<{
    uuid: string
}>, response: Response, nextFunction: NextFunction) => {
    const uuid = request.params.uuid;
    const userUuid = await userRepository.findById(uuid);
    response.status(StatusCodes.OK).send(userUuid);
})

usersRoute.post('/users', async (request: Request, response: Response, nextFunction: NextFunction) => {
    const newUser = request.body;
    const uuid = await userRepository.create(newUser);
    response.status(StatusCodes.CREATED).send(uuid);
})

usersRoute.put('/users/:uuid', async (request: Request<{
    uuid: string
}>, response: Response, nextFunction: NextFunction) => {
    const uuid = request.params.uuid;
    const modifiedUser = request.body;

    modifiedUser.uuid = uuid;
    await userRepository.update(modifiedUser);

    response.status(StatusCodes.OK).send();
})

usersRoute.delete('/users/:uuid', async (request: Request<{
    uuid: string
}>, response: Response, nextFunction: NextFunction) => {
    const uuid = request.params.uuid;

    await userRepository.remove(uuid);
    response.sendStatus(StatusCodes.OK);
})

export default usersRoute;