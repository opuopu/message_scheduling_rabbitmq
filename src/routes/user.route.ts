import { Request, Response } from 'express';
import emailQueue from '../queue/emailqueue';
import { USER } from '../repository/user.repo';
export const signup = async (req: Request, res: Response) => {
  const { email, name, id, number } = req.body as any;

  // 1. Save user
  const user = await USER(id, number, email, name);

  // 2. Create email job record [queueing system will handle retries, failures, etc.]
  const emailJob = await emailQueue.add('email-queue', {
    email,
    name,
    id: id,
    number: number,
  });

  // 3. Push job to BullMQ
  await emailQueue.add('send-welcome-email', {
    emailJobId: emailJob.id,
    email,
    name,
  });

  res.status(201).json({
    message: 'User created',
  });
};
