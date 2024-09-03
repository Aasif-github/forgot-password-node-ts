import express, { Application } from 'express';
import authRoutes from './routes/authRoutes';

const app: Application = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

// app.use((err: Error, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

export default app;
