const NODE_ENV = process.env.NODE_ENV || "development";

const development = {
  environment: "development",
  app: {
    port: process.env.PORT || 4003,
    host: process.env.HOST || 'localhost',
    jwtSecret: "9nvuNxXYIxjGBVGs6YUQ",
    verifyOptions: { algorithms: ["HS256"] },
    jwtExpiration: "20 day",
    routePrefix: "/api/v1"
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'db',
    mongoUrl: process.env.MONGO_DB_URL || "mongodb://localhost:27017/hapi-typescript-mongodb"
  },
  graphql: {
    url: process.env.GRAPHQL_URL || "http://localhost:4003/graphql"
  }
}

const test = {
  environment: "test",
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5002,
    jwtSecret: "9nvuNxXYIxjGBVGs6YUQ",
    jwtExpiration: "20 day",
    routePrefix: "/api/v1"
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'test',
    url: process.env.TEST_MONGODB_URL || "mongodb://localhost:27017/hapi-typescript-mongodb-test"
  }
}


const config: any = { development, test }

export default config[NODE_ENV]
