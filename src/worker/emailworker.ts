import { Worker } from 'bullmq';
import redis from '../config/redis';

// Mock email sender
const sendWelcomeEmail = async (email: string, name: string) => {
  console.log(`📧 Sending email to ${email}`);

  await new Promise(res => setTimeout(res, 2000));

  console.log(`✅ Email sent to ${email}`);
};

const emailWorker = new Worker(
  'email-queue',
  async job => {
    const { emailJobId, email, name } = job.data;

    console.log(`⚙️ Processing job ${job.id}`);

    try {
      await sendWelcomeEmail(email, name);
      // await markEmailSent(emailJobId);
      return true;
    } catch (err: any) {
      // await markEmailFailed(emailJobId, err.message);
      throw err; // triggers retry
    }
  },
  {
    connection: redis,
    removeOnFail: { count: 0 },
    removeOnComplete: { age: 3600, count: 1000, limit: 100 },
  }
);

console.log('🚀 Email worker started');

emailWorker.on('completed', job => {
  console.log(`🎉 Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});
