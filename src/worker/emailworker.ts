import { Worker } from 'bullmq';

const emailWorker = new Worker(
  'emailQueue',
  async (job: any) => {
    console.log('Processing job:', job.data);
  },
  {
    connection: {
      host: 'myredis.taskforce.run',
      port: 32856,
    },
  }
);
