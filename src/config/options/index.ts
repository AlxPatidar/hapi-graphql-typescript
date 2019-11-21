import Confidence from 'confidence'

import auth from './auth'
import cronJob from './cronJob'
import mongo from './mongo'
import swagger from './swagger'
import logger from './logger'
import hapiRateLimit from './hapiRateLimit'

// For development criteria based
const criteria = { env: process.env.NODE_ENV }

const config: any = {
    $meta: 'Our main server config',
    auth,
    cronJob,
    mongo,
    logger,
    swagger,
    hapiRateLimit
}

config.payload = { maxBytes: 100000000 }

// Create store for confidence
const store = new Confidence.Store(config)

// Export confidence store for fetch data
export default {
    get: (key: string) => store.get(key, criteria)
}