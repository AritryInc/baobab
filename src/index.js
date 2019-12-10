import express  from 'express';
import dotenv from 'dotenv';
import route from './routes';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.set('port', PORT)

app.get('/', (req, res, next) => {
    res.json({
        message: 'Baobab begins...!!!'
    });
});

// API routes
app.use('/api/v1', route);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

export default app;