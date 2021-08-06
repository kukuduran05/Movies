import express from "express";
import { errorHandler } from './middleware/errorHandlers.mjs';
import { notFoundHandler } from './middleware/notFoundHandler.mjs';

const app = express();

// Middlewares
app.use(express.json());

// Routes
import IndexRoutes from './routes/index.routes.mjs';
app.use(IndexRoutes);

// Catch 404
app.use(notFoundHandler);

// Errors
app.use(errorHandler);

app.listen(3000, function() {
    console.log(`Example app listening on port 3000`);
})