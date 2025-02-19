import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import productRouters from "./routes/productRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());

app.use("/api/products", productRouters);

app.listen(PORT , () => {
    connectDB();
    console.log('listening on port you')
})

// 