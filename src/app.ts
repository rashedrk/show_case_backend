import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Travel Buddy Matching server!');
});

export default app;
