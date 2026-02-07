import { Redis } from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // don't fail on transient errors
});

export default redis;
