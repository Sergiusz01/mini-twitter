import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Routes
const app = express();

// to serve images for public (public folder)
// Serwowanie plików z folderu 'public'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client's URL
    optionsSuccessStatus: 200 // For older browsers
}
// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions)); // Use CORS with options


dotenv.config();

mongoose.connect
(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() =>
    app.listen(process.env.PORT, () => console.log(`listening at ${process.env.PORT}`))
).catch((error) => console.log('Database connection error: ', error));



// uses of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);

// To serve images from the 'public' folder
app.use('/images', express.static('public/images'));