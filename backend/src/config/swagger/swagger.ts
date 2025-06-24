import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'XAcademy Challenge Junio',
      description: 'Sistema para gestionar jugadores de FIFA',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080/api/players',
        description: 'local server',
      },
    ],
  },
  apis: ['src/modules/*/*.ts',
    'src/modules/*/*/*.ts',
    'src/modules/*/*/*/*.ts',
    'src/modules/*/*/*/*/*.ts',
  ], 
};

const specs = swaggerJSDoc(options);

export default specs;