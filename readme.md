# Microsserviço de autenticação com NodeJs #
Projeto desenvolvido com finalidade de estudos de **NodeJs**. Este Projeto simples é um microserviço de autenticação utilizando Tokens de validação através da bibliteca *JWT* e *Express*.

## Compisição do Projeto ##
Endpoints Base:

**Usuários**
* GET /users
* GET /users/:uuid
* POST /users
* PUT /users/:uuid
* DELETE /users/:uuid

**Autenticação**
* POST /token
* POST /token/validate
