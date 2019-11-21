import * as Hapi from 'hapi'
import Mongoose from 'mongoose'
import BlueBird from "bluebird"
import Config from './options'
import Logger from '@utils/Logger'

export default class Plugins {
  // Define Swagger plugins
  public static async swagger(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('🏭  Plugins - Registering swagger-ui  🏭')

      await Plugins.register(server, [
        require('vision'),
        require('inert'),
        {
          options: Config.swagger.options,
          plugin: require('hapi-swagger')
        },
      ])
    } catch (error) {
      Logger.error(`🐛  Swagger plugin: ${error}  🐛`);
    }
  }
  // Define Logger plugin
  public static async logger(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('🏭  Plugins - Registering Logger  🏭');
      return server.register({
        plugin: require("@hapi/good"),
        options: Config.logger.options
      });
    } catch (error) {
      Logger.error(`🐛  Logger plugin: ${error}  🐛`);
    }
  }
  // Define hapi rate limit plugin
  public static async hapiRateLimit(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('🏭  Plugins - Registering Hapi Rate Limit  🏭');
      return server.register({
        plugin: require('hapi-rate-limit'),
        options: Config.hapiRateLimit.options
      });
    } catch (error) {
      Logger.error(`🐛  Hapi Rate Limit plugin: ${error}  🐛`);
    }
  }
  // Define hapi-auth-jwt2 for encode and decode jwt token
  public static async auth(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('🏭  Plugins - Registering Auth  🏭');
      return server.register({
        plugin: require('hapi-auth-jwt2'),
      });
      server.auth.strategy('jwt', 'jwt', Config.auth.options)
    } catch (error) {
      Logger.error(`🐛  Hapi Auth plugin: ${error} 🐛`);
    }
  }
  // Define cron job with options in options folder
  public static async cronJob(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('🏭  Plugins - Registering Cron Job  🏭');
      return server.register({
        plugin: require('hapi-cron'),
        options: Config.cronJob.options
      });
    } catch (error) {
      Logger.error(`🐛  Cron Job plugin: ${error}  🐛`);
    }
  }
  // Define mongo plugins and create database connection
  public static async mongo(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('🏭  Plugins - Registering Mongo  🏭\n');
      if (!Mongoose.connection.readyState) {
        Mongoose.Promise = BlueBird
        Logger.silly(`${process.env.NODE_ENV} server connecting to ${Config.mongo.url}`)
        Mongoose.set('useFindAndModify', false)
        Mongoose.set('useCreateIndex', true)
        Mongoose.set('useUnifiedTopology', true)
        Mongoose.connect(Config.mongo.url, Config.mongo.options, (error: any) => {
          if (error) {
            Logger.error(`🐞 🐛 Failed to connect to mongodb\n\n\n${error} 🐛 🐞`)
          }
          Logger.info(`🎳  Database connected:- ${Config.mongo.url} 🎳 \n`)
        })
      }
    } catch (error) {
      Logger.error(`🐛  Cron Job plugin: ${error}  🐛`);
    }
  }
  // Call all register plugin here
  public static async registerAll(server: Hapi.Server): Promise<Error | any> {
    if (process.env.NODE_ENV === 'development') {
      await Plugins.swagger(server)
      await Plugins.logger(server)
      await Plugins.hapiRateLimit(server)
      await Plugins.auth(server)
      await Plugins.cronJob(server)
      await Plugins.mongo(server)
    }
  }
  // Register list of plugin
  private static async register(
    server: Hapi.Server,
    plugin: any
  ): Promise<void> {
    Logger.debug('registering: ' + JSON.stringify(plugin))

    return new Promise((resolve, reject) => {
      server.register(plugin)
      resolve()
    })
  }
}
