import express  from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.set('port', PORT)

app.get('/', (req, res, next) => {
    res.json({
        message: 'Baobab begins...!!!'
    });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})