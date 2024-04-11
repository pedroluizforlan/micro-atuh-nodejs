import express, {Request, Response, NextFunction} from 'express';
import {StatusCodes} from "http-status-codes";
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route";
import errorHandler from "./middlewares/error-handler.middleware";

const app = express();


//Configuração das aplicações
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuração de Rotas
app.use(usersRoute);
app.use(statusRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

//Inicializador de rotas
const route = 'http://localhost'
const getway = '3000'
app.listen(3000, () => {
    console.log(`Aplicação executando em: ${route}:${getway}`)
})