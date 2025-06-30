# Traveler Social Backend

A NestJS backend for a travel-focused social media platform with comprehensive features for travelers to connect, share experiences, and interact.

## Features

- **User Management**: Registration, authentication, profiles, account settings
- **Posts & Media**: Share updates with text, images, location tagging
- **Social Connections**: Friend/follow system with requests and suggestions
- **Engagement**: Comments, likes, replies
- **Messaging**: Direct messaging between users and group chats
- **Content Discovery**: Hashtags, activity feeds, trending content
- **Privacy Controls**: Granular control over content visibility

## Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT tokens
- **API Documentation**: Swagger UI

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the environment variables:
   ```
   cp .env.example .env
   ```
4. Configure the environment variables in the `.env` file
5. Start the development server:
   ```
   npm run start:dev
   ```

### Database Setup

The application uses PostgreSQL with TypeORM. Make sure to:

1. Create a new PostgreSQL database
2. Update the database connection settings in the `.env` file
3. The application will automatically create the necessary tables

## API Documentation

When the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Authentication

The API uses JWT for authentication. To authenticate:

1. Register a new user or login with existing credentials
2. Use the returned JWT token in the Authorization header for subsequent requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## Frontend Integration

This backend is designed to work with a NextJS frontend (to be developed separately). The API endpoints follow RESTful conventions and return JSON responses that can be easily consumed by any frontend application.

## License

[MIT](LICENSE)