import Config from "@config/options"

export default {
  swagger: {
    options: Config.get("/swagger"),
  },
  logger: {
    options: Config.get("/logger")
  },
  hapiRateLimit: {
    options: Config.get("/hapiRateLimit")
  },
  auth: {
    options: Config.get("/auth")
  },
  cronJob: {
    options: Config.get("/auth")
  },
  mongo: {
    url: Config.get("/mongo").url,
    options: Config.get("/mongo").options
  }
};
