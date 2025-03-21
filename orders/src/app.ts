import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from "@mazentickets/common";
import { createOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { updateOrderRouter } from './routes/update';

const app = express();
app.set('trust proxy', true) // trust the ingress nginx proxy
app.use(express.json());
app.use(cookieSession({
  signed: false, // disable encryption
  secure: process.env.NODE_ENV !== 'test', // cookie only works in https
}))

app.use(currentUser);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(updateOrderRouter);
app.all('*', () => {
  throw new NotFoundError();
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };