import { Redis } from 'ioredis'

export const redisOpts = {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379
}

export const redis = new Redis(redisOpts)