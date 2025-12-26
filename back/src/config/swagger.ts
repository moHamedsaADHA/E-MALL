import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'E-Mall API', version: '1.0.0' },
  },
  apis: ['./src/api/v1/*.ts'],
});

export default swaggerSpec;
