import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import route from './routes';
import Error from './error-handler';

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
  const error = Error.withDetails(404, 'Resource Not Found');
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.content,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

export default app;
