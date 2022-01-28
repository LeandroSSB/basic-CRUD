import "reflect-metadata";
import express, { Express } from "express";
import router from "./routes";

const app: Express = express();
app.use(express.json());

router(app);

export default app;
