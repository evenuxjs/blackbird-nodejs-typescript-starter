# Blackbird Node.js TypeScript Starter

This repository is a starter kit for building a RESTful API using Node.js, Express, Knex, MySQL and TypeScript. It includes a fully functional user system with roles, permissions, and ACL, along with JWT authentication and nodemailer email integration. The project is designed for flexibility and scalability, making it easy to adapt for production environments.

## Features

- **Node.js & TypeScript**: Backend powered by Node.js with TypeScript for type safety and enhanced developer experience.
- **User System**: Manage users with authentication and authorization.
- **Role System**: Implement role-based access control for user permissions.
- **Permission System**: Fine-grained control over which users can access specific resources.
- **Access Control List (ACL)**: Manage permissions for different user roles with ACL-based checks.
- **Configurable Express Rate Limiting**: Limit API usage to prevent abuse with configurable rate-limiting.
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens for stateless authentication.
- **nodemailer Integration**: Send emails via nodemailer for user verification, password resets, and more.
- **snake_case and camelCase conversion**: Automatically convert snake_case keys from database into camelCase.
- **Payload encryption**: Encrypt all your response payloads to make it harder to reverse engineer the API.
- **Husky pre-commit hook**: Automatically format and lint your code with a Husky pre-commit hook.
- **Minification**: Automatically minify the builded code from the "dist" folder, when building the app.
- **Obfuscation**: Automatically obfuscate the builded code from the "dist" folder, when building the app.

## Prerequisites

- Node.js v16 or higher
- NPM or Yarn
- MariaDB or MySQL

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/evenuxjs/blackbird-nodejs-typescript-starter.git
cd blackbird-nodejs-typescript-starter
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create .env.production/.env.development files at the root of the project and add the following configuration:

```bash
# Application
PORT=
ENVIRONMENT=
ENCRYPTION_KEY=
ENCRYPTION_ENABLED=

# Database
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

RATE_LIMIT_WINDOW_MS=
RATE_LIMIT_MAX_REQUESTS=

# JWT Config
JWT_SECRET=
JWT_EXPIRY=

# Emailing
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_LOCAL_IP=
```

## Running the Server

To start the development server, run:

```bash
npm run start:dev
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
