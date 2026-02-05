import amqplib from 'amqplib';

const RABBIT_URL = 'amqp://guest:guest@localhost:5672';

(async () => {
  try {
    const conn = await amqplib.connect(RABBIT_URL);
    console.log('✅ Connected to RabbitMQ');

    const channel = await conn.createChannel();
    await channel.assertQueue('hello');

    channel.sendToQueue('hello', Buffer.from('Hello from Node!'));
  } catch (err) {
    console.error('❌ RabbitMQ error:', err);
  }
})();
