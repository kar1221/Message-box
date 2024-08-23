import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import {
  addMessage,
  fetchMessage,
  fetchMessages,
} from './controllers/messageController';
import HttpError from './errors/HttpError';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Routes
app.get('/', fetchMessages);
app.get('/new', (req: Request, res: Response) => {
  res.render('createMessage');
});
app.post('/new', addMessage);
app.get('/:messageId', fetchMessage);

// Error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    next();
    return;
  }

  res.render('error', {
    code: 500,
    message: err.message,
    name: err.name,
  });
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.render('error', {
    code: err.statusCode,
    message: err.message,
    name: err.name,
  });
});

// Setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
