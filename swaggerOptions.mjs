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
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.mjs"]
}