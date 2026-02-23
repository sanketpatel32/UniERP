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
			securitySchemes: {
				BearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
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
				SignupCompanyRequest: {
					type: "object",
					required: ["companyName", "fullName", "email", "password"],
					properties: {
						companyName: {
							type: "string",
							example: "Acme Corp",
						},
						companySlug: {
							type: "string",
							example: "acme-corp",
						},
						fullName: {
							type: "string",
							example: "Alice Admin",
						},
						email: {
							type: "string",
							format: "email",
							example: "admin@acme.com",
						},
						password: {
							type: "string",
							format: "password",
							example: "StrongPass123!",
						},
					},
				},
				LoginRequest: {
					type: "object",
					required: ["email", "password"],
					properties: {
						email: {
							type: "string",
							format: "email",
							example: "admin@acme.com",
						},
						password: {
							type: "string",
							format: "password",
							example: "StrongPass123!",
						},
					},
				},
				AuthUser: {
					type: "object",
					properties: {
						id: {
							type: "string",
							format: "uuid",
						},
						fullName: {
							type: "string",
							example: "Alice Admin",
						},
						email: {
							type: "string",
							format: "email",
							example: "admin@acme.com",
						},
						companyId: {
							type: "string",
							format: "uuid",
						},
						role: {
							type: "string",
							enum: ["company_admin", "employee"],
							example: "company_admin",
						},
					},
				},
				AuthData: {
					type: "object",
					properties: {
						accessToken: {
							type: "string",
							example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
						},
						user: {
							$ref: "#/components/schemas/AuthUser",
						},
					},
				},
				AuthResponse: {
					type: "object",
					properties: {
						message: {
							type: "string",
							example: "Login successful",
						},
						data: {
							$ref: "#/components/schemas/AuthData",
						},
						status: {
							type: "integer",
							example: 200,
						},
					},
				},
				MeResponse: {
					type: "object",
					properties: {
						message: {
							type: "string",
							example: "Authenticated user",
						},
						data: {
							$ref: "#/components/schemas/AuthUser",
						},
						status: {
							type: "integer",
							example: 200,
						},
					},
				},
				AdminCheckResponse: {
					type: "object",
					properties: {
						message: {
							type: "string",
							example: "Admin access verified",
						},
						data: {
							type: "object",
							properties: {
								userId: {
									type: "string",
									format: "uuid",
								},
								companyId: {
									type: "string",
									format: "uuid",
								},
								role: {
									type: "string",
									enum: ["company_admin", "employee"],
								},
							},
						},
						status: {
							type: "integer",
							example: 200,
						},
					},
				},
			},
		},
	},
	apis: ["./src/modules/*/routes/*.ts", "./index.ts"], // Paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJsdoc(options);
