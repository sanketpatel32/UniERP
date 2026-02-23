import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Backend API Documentation",
			version: "1.0.0",
			description:
				"API documentation for the Express + TypeScript backend application.",
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3001}`,
				description: "Development Server",
			},
		],
		components: {
			schemas: {
				SuccessResponse: {
					type: "object",
					properties: {
						message: {
							type: "string",
							example: "Operation successful",
						},
						data: {
							type: "object",
							nullable: true,
						},
						status: {
							type: "integer",
							example: 200,
						},
					},
				},
				ErrorResponse: {
					type: "object",
					properties: {
						message: {
							type: "string",
							example: "Internal Server Error",
						},
						data: {
							type: "null",
						},
						status: {
							type: "integer",
							example: 500,
						},
					},
				},
			},
		},
	},
	apis: ["./src/modules/*/routes/*.ts", "./index.ts"], // Paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJsdoc(options);
