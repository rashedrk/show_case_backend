import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/Errors/globalErrorHandler';
import notFound from './app/Errors/notFound';

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Show Case Backend API!',
  });
});

//Application routes
app.use('/api/v1', router);

// Global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
