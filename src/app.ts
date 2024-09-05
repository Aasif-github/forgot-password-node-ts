import express, { Application } from 'express';
import authRoutes from './routes/authRoutes';
import path from 'node:path';



const app: Application = express();

app.use(express.json());
app.use('/api/auth', authRoutes);


// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle the reset password route
app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});


// app.use((err: Error, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

export default app;
