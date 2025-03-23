import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import { db } from "./config/connection.js";
import { aggregateExample } from "./controllers/aggregateExample.js";

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.get("/store-monthly-sales", aggregateExample);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running at port 5000"));
