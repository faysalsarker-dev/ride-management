import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorConverter from './app/errors/errorConverter';
import errorHandler from './app/middleware/errorHandler.middleware';
import { router } from './app/routes';



const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "api is working..."
    })
})


app.use(errorConverter);
app.use(errorHandler);

export default app;
