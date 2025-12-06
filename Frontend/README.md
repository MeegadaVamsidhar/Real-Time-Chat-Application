# ChatFlow Frontend 🎨

The React frontend for the ChatFlow application, built with React, TailwindCSS, and Socket.io Client.

## 🚀 Getting Started

> ⚠️ **Configuration Note:** This project uses `.env` for API and Socket URLs. Do not commit this file if it contains public URLs or sensitive keys.

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

4. Start the application:
   ```bash
   npm start
   ```

The application will launch in your default browser at `http://localhost:3000`.

## 🛠️ Tech Stack

- **[React 18](https://react.dev/)** - Component-based UI library
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Socket.io Client](https://socket.io/)** - Real-time bidirectional event-based communication
- **[Axios](https://axios-http.com/)** - Promise based HTTP client
- **[React Router v6](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

## 📁 Project Structure

```
Frontend/
├── public/                 # Static assets (favicons, manifest, etc.)
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context providers (AuthContext)
│   ├── pages/             # Main application pages/routes
│   ├── services/          # API & Socket service layers
│   ├── styles/            # Global styles and Tailwind configuration
│   ├── utils/             # Helper functions and constants
│   ├── App.js             # Main App component
│   └── index.js           # Entry point
├── .env                    # Environment variables
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # TailwindCSS configuration
```

## 🚦 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm test`
Launches the test runner in the interactive watch mode.

## 🤝 Contributing

This frontend is part of the ChatFlow project. Please ensure the backend server is running for full functionality.
