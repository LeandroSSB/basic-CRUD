# Entrega: CRUD Usuário TypeORM + JWT

Nesta entrega vamos desenvolver um CRUD de usuário utilizando TypeORM.

Endpoints do serviço:

| Método | Endpoint       | Responsabilidade                                                                                        |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------- |
| POST   | /users         | Criação de usuários                                                                                     |
| POST   | /login         | Gera um token JWT recebendo email e password no corpo da requisição como JSON.                          |
| GET    | /users         | Lista todos os usuários                                                                                 |
| GET    | /users/profile | Retorna os dados do usuário logado (usuário a qual pertence o token que será necessário neste endpoint) |
| PATCH  | /users         | /<uuid> Atualiza os dados de um usuário                                                                 |
| DELETE | /users         | /<uuid> Deleta usuários do banco                                                                        |

## Configuracao

- Altere os dados sugeridos do arquivo .env.example
- utilize o comando:

```
yarn
```

ou

```
npm install
```

para instalar devidamente as dependencias

- Instale as migrations

```
  yarn typeorm migration:run

```

Caso precise apagar a tabela:

```
yarn typeorm migration:revert
```

- A porta padrao da aplicacao e 3000

## Aviso

Algumas rotas precisam de autorizacoes e permissoes especiais. Para conseguir as respostas esperas e recomendado criar uma conta com privilegios de administrador e utilizar seu token nas requicicoes

## POST - /users

### Exemplos de requisições:

```json
{
  "name": "daniel",
  "email": "daniel@kenzie.com",
  "password": "123456",
  "isAdm": true
}
```

Status: 201 CREATED

```json
{
  "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
  "createdOn": "2021-11-18T01:23:52.910Z",
  "updatedOn": "2021-11-18T01:23:52.910Z",
  "name": "daniel",
  "email": "daniel@kenzie.com",
  "isAdm": true
}
```

## POST - /login

### Exemplos de requisições:

```json
{
  "email": "daniel@kenzie.com",
  "password": "123456"
}
```

Status: 200 OK

```json
{
    "token": "4b72c6f34b72c6f3-6d0a-6a1-86c6-687d52de4fc7-6d0a-6a1-86c6-687d
    2c6f3-6d0a-6a1-86c6-687d52de4fc74b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
}
```

## GET - /users

### Exemplos de requisições:

Status: 200 OK

```json
[
  {
    "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
    "createdOn": "2021-11-18T01:23:52.910Z",
    "updatedOn": "2021-11-18T01:23:52.910Z",
    "name": "daniel",
    "email": "daniel@kenzie.com",
    "isAdm": true
  }
]
```

## GET - /users/profile

### Exemplos de requisições:

Status: 200 OK

```json
{
  "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
  "createdOn": "2021-11-18T01:23:52.910Z",
  "updatedOn": "2021-11-18T01:23:52.910Z",
  "name": "daniel",
  "email": "daniel@kenzie.com",
  "isAdm": true
}
```

## PATCH - /users/<uuid>

### Exemplos de requisições:

Com header de autorização.

```json
{
  "name": "Daniel Kenzie",
  "email": "daniel@kenzie.com.br"
}
```

Status: 200 OK

```json
{
  "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
  "createdOn": "2021-11-18T01:23:52.910Z",
  "updatedOn": "2021-11-21T07:44:21.520Z",
  "name": "Daniel Kenzie",
  "email": "daniel@kenzie.com.br",
  "isAdm": true
}
```

## DELETE - /users/<uuid>

### Exemplos de requisições:

Com header de autorização.

Status: 200 OK

```json
{
  "message": "User deleted with success"
}
```
