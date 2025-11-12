/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './app/config';
import { sequelize } from './app/config/database';

const port = config.port || 5000;

let server: Server;

async function main() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    // Start server
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Handle server errors
    server.on('error', (error: Error & { code?: string }) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
      } else {
        console.error('Server error:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Rejection:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (server) {
    server.close(async () => {
      await sequelize.close();
      console.log('HTTP server closed');
      process.exit(0);
    });
  }
});

main();
