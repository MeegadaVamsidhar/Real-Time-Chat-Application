# ChatFlow Backend API 🚀

The robust Node.js/Express backend for the ChatFlow application, powering real-time messaging, authentication, and data management.

## ✨ Features

- **RESTful API Architecture** - Clean and organized endpoints
- **Real-time Communication** - Socket.io for instant messaging and status updates
- **Secure Authentication** - JWT (JSON Web Tokens) with HTTP-only cookies
- **Database Management** - MongoDB with Mongoose ODM for data modeling
- **Security Best Practices** - Helmet, CORS, Rate Limiting, and Input Validation
- **Error Handling** - Centralized error management system

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Auth**: JWT, bcryptjs
- **Validation**: express-validator

## 🚀 Getting Started

> 🚨 **Security Note:** The `.env` file contains sensitive credentials (DB connection strings, JWT secrets). It is listed in `.gitignore` and should never be committed to the repository.

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (Local or Atlas connection string)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chat-app
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Start the Server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/update-profile` | Update profile details |
| PUT | `/api/auth/change-password` | Change password |

### Chats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | Get all chats for user |
| POST | `/api/chats` | Create/Get one-to-one chat |
| POST | `/api/chats/group` | Create group chat |
| PUT | `/api/chats/:id` | Update group chat |
| DELETE | `/api/chats/:id` | Delete chat |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:chatId` | Get messages for a chat |
| POST | `/api/messages` | Send a message |
| PUT | `/api/messages/:id/read` | Mark message as read |

## 🔌 Socket.io Events

### Client Emits
- `authenticate`: Send token to verify identity
- `join-chat`: Join a specific chat room
- `send-message`: Send a new message
- `typing-start` / `typing-stop`: Typing indicators

### Server Emits
- `authenticated`: Confirmation of auth
- `new-message`: Broadcast new message to recipients
- `user-typing`: Notify others of typing status
- `user-online` / `user-offline`: Status updates

## 📁 Project Structure

```
backend/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Auth, error, validation middleware
├── models/         # Mongoose schemas
├── routes/         # API route definitions
├── socket/         # Socket.io event handlers
└── server.js       # App entry point
```

## 🤝 Contributing

This backend is part of the ChatFlow project. Ensure the frontend is running at the configured `CLIENT_URL` for CORS to work correctly.

## 📄 License

MIT
