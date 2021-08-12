import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API",
            version: "1.0.0",
            description: "A simple express Rest API for create users with movies"
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? process.env.aws_url_prod+':'+process.env.PORT : process.env.aws_url_dev+':'+process.env.PORT
            }
        ]
    },
    apis: ["./routes/*.mjs"]
}