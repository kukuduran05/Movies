import express from "express";
import { errorHandler } from './middleware/errorHandlers.mjs';
import { notFoundHandler } from './middleware/notFoundHandler.mjs';

// Swagger
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions.mjs";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

// Middlewares
app.use(express.json());

const specs = swaggerJSDoc(options);

// Routes
import IndexRoutes from './routes/index.routes.mjs';
app.use(IndexRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Catch 404
app.use(notFoundHandler);

// Errors
app.use(errorHandler);

app.listen(3000, function() {
    console.log(`Example app listening on port 3000`);
})