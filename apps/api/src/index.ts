import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import topicRoutes from './routes/topic.routes';
import userRoutes from './routes/user.routes';
import assessmentRoutes from './routes/assessment.routes';
import learningPathRoutes from './routes/learning-path.routes';
import quizRoutes from './routes/quiz.routes';
import progressRoutes from './routes/progress.routes';

// Import workers to ensure they start
import './workers/assessment.worker';
import './workers/learning-path.worker';
import './workers/quiz.worker';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/learning-path', learningPathRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
