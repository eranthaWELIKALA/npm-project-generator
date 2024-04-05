const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation generated with Swagger',
        },
        basePath: '/',
        components: {
            schemas: {
                TestData: {
                    type: 'object',
                    properties: {
                        data: { type: 'string', description: "Testing data" }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', description: 'Error message' },
                        statusCode: { type: 'number', description: 'HTTP status code' }
                    }
                }
            }
        }
    },
    // List of files to be processed by swagger-jsdoc
    apis: ['./routes/*.js'], // Path to the API routes folder
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
