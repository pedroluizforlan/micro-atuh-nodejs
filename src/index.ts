import express, {Request, Response, NextFunction} from 'express';
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import bearerAthenticationMiddleware from './middlewares/bearer-authentication.middleware'

const app = express();


//Configuração das aplicações
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuração de Rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(bearerAthenticationMiddleware)
app.use(usersRoute);
//Configuração dos Handlers de Erro
app.use(errorHandler);

//Inicializador de rotas
const route = 'http://localhost'
const getway = '3000'
app.listen(3000, () => {
    console.log(`Aplicação executando em: ${route}:${getway}`)
})