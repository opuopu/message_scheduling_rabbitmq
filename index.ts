import express from 'express';
import { connectDB } from './src/config/dbInit';
import { signup } from './src/routes/user.route';
export const app = express();
app.use(express.json()); // ✅ for JSON body
app.use(express.urlencoded({ extended: true })); // ✅ optional
const port = 3000;
connectDB();
app.post('/users', signup);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
