# Hapi-graphql-mongodb-typescript

 > `hapi-graphql-typescript` uses Apollo Server, Typescript, Node.js, Hapi and MongoDB.


## Quick Start

  The quickest way to get started with Hapi-graphql-typescript server use [`github`](https://github.com/AlxPatidar/hapi-graphql-typescript.git) repository and clone as shown below:

```bash
# Have access problem use sudo or run terminal with adminstration
$ git clone https://github.com/AlxPatidar/hapi-graphql-typescript.git server
# change directory to server folder
$ cd server
```
Install dependencies and devDependencies:
```bash
$ yarn install / npm install
```
## Configuration
Start mongodb server:
```bash
$ sudo service mongod start
# restore database where replace PATH where project located
# example:- mongorestore /home/user/work/server/database 
$ mongorestore PATH/server/database 
```
Configuration environment and change basic credentials:
```bash
$ cp .env.example .env
```

## Start Server

Start the apollo/hapi server:
```bash
$ yarn start
```
Start the development server:

```bash
$ yarn start:dev
```
  View the website at: http://localhost:4003/graphql

## Run Test
  
```bash
# Only single and simple test is present
$ yarn run test
```

## Features
  * Language - TypeScript
  * Apollo server (Graphql)
  * With REST API - Hapijs
  * Focus on high performance
  * TsLint
  * Circle CI
  * Docker
  * Validation - Joi (For reset API)

## Useful npm/yarn commands

  * `yarn build` - Transpile TypeScript code
  * `yarn clean` - Remove build folder
  * `yarn start` - Run application
  * `yarn start:dev` - Run application in development mode
  * `yarn run fix` - Run for typescript linting
  * `yarn run test` - Run for test
  
## Docs & Community

  * [#Hapi](https://hapi.dev/) for node js framework
  * [#Apollo-Server](https://www.apollographql.com/docs/apollo-server/) for Official Apollo server & Modules
  * [#Graphql](https://graphql.org) for Official Graphql & Modules
  * [#Jest](https://jestjs.io/) for Official testing tools
  * [#MongoDB](https://docs.mongodb.com/manual/) for Official Database management
  * [#Docker](https://www.docker.com/) for container list 
  * [#Yarn](https://yarnpkg.com/lang/en/) for Official package manager
  * [#CodeEditor](https://code.visualstudio.com/) Official text editor
  * [#StackOverflow](https://stackoverflow.com/users/10893484/ashok) thanks for helping and provide solution on every problem 