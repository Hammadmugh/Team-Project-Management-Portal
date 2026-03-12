const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Team & Project Management API",
      version: "1.0.0",
      description: "A RESTful API for managing members, projects, and team collaboration with JWT authentication",
      contact: {
        name: "DevSquad",
      },
    },
    servers: [
      // {
      //   url: "https://dev-squad26-week3-day2-backend.vercel.app",
      //   description: "Production server",
      // },
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            email: {
              type: "string",
              example: "john_doe@example.com",
            },
            password: {
              type: "string",
              example: "hashedPassword123",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Member: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439012",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              example: "Developer",
            },
            createdBy: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439013",
            },
            title: {
              type: "string",
              example: "E-commerce Platform",
            },
            description: {
              type: "string",
              example: "A robust e-commerce platform built with Node.js and React",
            },
            techStack: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Node.js", "Express", "MongoDB", "React"],
            },
            status: {
              type: "string",
              enum: ["active", "completed"],
              example: "active",
            },
            teamMembers: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["507f1f77bcf86cd799439012"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;