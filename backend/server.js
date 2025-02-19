import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import productRouters from "./routes/productRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRouters);

app.listen(5000 , () => {
    connectDB();
    console.log('listening on port 5000')
})

// 