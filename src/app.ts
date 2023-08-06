import cors from 'cors';
import passport from 'passport';
import express, { Express, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import helmet from 'helmet';
import db from '@models/index';
import routes from '@routes/index.js';
import { jwtStrategy } from '@configs/passport.js';
import ApiError from '@helpers/ApiError.js';
import { errorConverter, errorHandler } from '@middlewares/error.js';
import redisClient from '@configs/redisClient.js';

process.env.PWD = process.cwd();

export const app: Express = express();

// enable cors
// options for cors middleware
app.use(
    cors({
        origin: '*',
    })
);

// To enable securities in HTTP headers
app.use(helmet());

app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// jwt authentication
passport.use('jwt', jwtStrategy);
app.use(passport.initialize());

app.get('/api/v1/test', async (req, res) => {
    res.status(200).send('Congratulations!Typescript API is working!');
});

app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);

redisClient.on('error', (err) => {
    console.log(err);
    redisClient.quit();
});
redisClient.connect();

// Uncomment this line if you want to sync database model
// db.sequelize.sync();
