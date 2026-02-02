import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library Management System API",
            version,
            description: "API documentation for the Library Management System",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs available at http://localhost:8080/api-docs");
};
