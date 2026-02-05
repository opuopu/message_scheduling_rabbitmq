import { Queue } from 'bullmq';
const myQueue = new Queue('emailQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});
