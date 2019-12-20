import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import route from './routes';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.set('port', PORT);

app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Baobab begins...!!!',
  });
});

// API routes
app.use('/api/v1', route);

app.use((req, res, next) => {
  const error = new Error('Resource Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    status: 'error',
    error: err.message || 'Internal Server Errror',
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

export default app;
