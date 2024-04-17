import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { router } from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    allowedHeaders: '* ',
    credentials: true,
    
}));

app.use('/files', express.static('tmp'));

app.use(router);


app.use((err: Error, req: Request, res: Response) => {


    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    };

    return res.status(500).json({
        status: 'Error',
        message: 'Internal server error'
    });
});

app.listen({ host: '0.0.0.0', port: process.env.PORT && Number(process.env.PORT) || 3333 }, () => console.log('Server tá on'));

