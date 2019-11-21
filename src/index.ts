import 'module-alias/register';
import * as Hapi from "hapi"
import * as dot from "dotenv"
import Router from "./api/routes"
import Config from "@config/index"
import * as Helper from "@utils/helper"
import Plugin from "@utils/plugins"
import Logger from "@utils/Logger"
import defaultQuery from "@config/defaultQuery"

import { ApolloServer } from 'apollo-server-hapi'
import schema from "./grpahql"
dot.config()

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`)
})

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`)
})

const start = async () => {
  const host = Config.app.host
  const port = Config.app.port

  // Create apollo server and pass schema and resolver
  const server = new ApolloServer({
    debug: true,
    schema,
    playground: {
      tabs: defaultQuery
    },
    context: async ({ request, h }) => {
      // get the user token from the headers
      const token = request.headers.authorization || false
      let data = {}
      if (!token) {
        data = { isAuth: false, message: "Token not Provided!", user: null }
      } else {
        data = Helper.verifyToken(token)
      }
      return { request, h, ...data, token }
    },
    formatError: (error: Error) => {
      return { status: false, message: error.message, data: [] }
    }
  })

  const app = new Hapi.Server({ port, host })

  // call registerRoutes function for register routes
  await Router.registerRoutes(app)
  // All register function to register all plugins
  await Plugin.registerAll(app)
  // apply middleware with apollo server
  await server.applyMiddleware({ app })

  await server.installSubscriptionHandlers(app.listener)

  app.start().then((server: any) => {
    Logger.info(`🚀  Server started at http://${host}:${port} 🚀`)
    Logger.info(`🚀  Graphql Server started at http://${host}:${port}/graphql 🚀`)
    Logger.info(`🚀  Swagger docs at http://${host}:${port}/documentation 🚀`)
  })
}

start()