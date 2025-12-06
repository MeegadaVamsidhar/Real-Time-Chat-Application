# ChatFlow 💬

A modern, full-featured real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js). It features secure user authentication, real-time messaging with Socket.io, group chats, and a beautiful UI.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-gray?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black?logo=socket.io)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.6-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** - Secure login and registration
- **Password Hashing** - bcrypt for secure password storage
- **Profile Management** - Update user details and avatar
- **Secure Cookies** - HTTP-only cookies for token storage

### 💬 Real-time Messaging
- **Instant Messaging** - Powered by Socket.io
- **Typing Indicators** - See when others are typing
- **Online Status** - Real-time online/offline status
- **Read Receipts** - Know when messages are read
- **One-to-One Chats** - Private direct messages
- **Group Chats** - Multi-user conversations

### 🎨 UI/UX
- **Modern Design** - Clean interface with TailwindCSS
- **Responsive** - Works on mobile, tablet, and desktop
- **Toast Notifications** - Real-time alerts for actions
- **Loading States** - Smooth skeletons and spinners

## 🚀 Tech Stack

### Frontend
- **[React 18](https://react.dev/)** - UI library
- **[TailwindCSS](https://tailwindcss.com/)** - Styling
- **[Socket.io Client](https://socket.io/)** - Real-time communication
- **[Axios](https://axios-http.com/)** - API requests
- **[React Router v6](https://reactrouter.com/)** - Routing
- **[Lucide React](https://lucide.dev/)** - Icons

### Backend
- **[Node.js](https://nodejs.org/)** - Runtime environment
- **[Express.js](https://expressjs.com/)** - Web framework
- **[MongoDB](https://www.mongodb.com/)** - Database
- **[Mongoose](https://mongoosejs.com/)** - ODM
- **[Socket.io](https://socket.io/)** - WebSocket server
- **[JWT](https://jwt.io/)** - Authentication

## 📋 Prerequisites

- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **MongoDB** (Local or Atlas)

## 🛠️ Installation & Setup

> 🚨 **Security Note:** This project relies on environment variables for sensitive configuration (Database connections, Secrets). The `.env` files are ignored by git to protect your security. **Never** commit your `.env` files to version control.

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the example or create new one with:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# CLIENT_URL=http://localhost:3000

# Start the server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to Frontend directory
cd Frontend

# Install dependencies
npm install

# Create .env file
# REACT_APP_API_URL=http://localhost:5000/api
# REACT_APP_SOCKET_URL=http://localhost:5000

# Start the application
npm start
```

Access the application at `http://localhost:3000`

## 📁 Project Structure

```
chat/
├── backend/                # Node.js/Express Backend
│   ├── config/            # Database config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & Error middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── socket/            # Socket.io logic
│   └── server.js          # Entry point
│
├── Frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # UI Components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page Components
│   │   ├── services/      # API & Socket services
│   │   ├── styles/        # Global styles
│   │   └── utils/         # Helper functions
│   ├── public/            # Static assets
│   └── package.json
│
└── README.md
```

## 🗺️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | UserLogin | Sign in to account |
| `/register` | UserRegistration | Create new account |
| `/chat-dashboard` | ChatDashboard | Main chat interface |
| `/new-chat` | NewChatCreation | Start new conversation |
| `/settings` | UserProfileSettings | Manage profile |

## 🚦 Available Scripts

### Frontend
- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

### Backend
- `npm run dev` - Runs server with Nodemon
- `npm start` - Runs server in production mode

## ✅ Completed Enhancements

- [x] **Backend Integration** - Connected to Express/MongoDB
- [x] **Real-time Messaging** - Socket.io integration
- [x] **Database** - MongoDB integration
- [x] **Authentication** - JWT token-based auth
- [x] **State Management** - Context API for Auth

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
