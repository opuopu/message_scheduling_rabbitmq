import { Worker } from 'bullmq';
import redis from '../config/redis.js';

const emailWorker = new Worker(
  'emailQueue',
  async (job: any) => {
    console.log('Processing job:', job.data);
  },
  {
    connection: redis,
  }
);
