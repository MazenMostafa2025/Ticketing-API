import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from "@mazentickets/common";
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true) // trust the ingress nginx proxy
app.use(express.json());
app.use(cookieSession({
  signed: false, // disable encryption
  secure: process.env.NODE_ENV !== 'test', // cookie only works in https
}))

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all('*', () => {
  throw new NotFoundError();
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };