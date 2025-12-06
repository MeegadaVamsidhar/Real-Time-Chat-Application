const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = (io) => {
    // Store connected users
    const connectedUsers = new Map();

    io.on('connection', (socket) => {
        console.log(`✅ New socket connection: ${socket.id}`);

        // User authentication via socket
        socket.on('authenticate', async (token) => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);

                if (!user) {
                    socket.emit('auth-error', { message: 'User not found' });
                    return;
                }

                // Update user's socket ID and online status
                await User.findByIdAndUpdate(user._id, {
                    socketId: socket.id,
                    isOnline: true
                });

                socket.userId = user._id.toString();
                connectedUsers.set(socket.id, user._id.toString());

                // Notify user is online
                socket.broadcast.emit('user-online', {
                    userId: user._id,
                    username: user.username
                });

                socket.emit('authenticated', {
                    message: 'Successfully authenticated',
                    userId: user._id
                });

                console.log(`👤 User authenticated: ${user.username} (${socket.id})`);
            } catch (error) {
                console.error('Authentication error:', error);
                socket.emit('auth-error', { message: 'Invalid token' });
            }
        });

        // User starts typing
        socket.on('typing-start', async (data) => {
            const { chatId, username } = data;
            socket.to(chatId).emit('user-typing', { chatId, username });
        });

        // User stops typing
        socket.on('typing-stop', async (data) => {
            const { chatId } = data;
            socket.to(chatId).emit('user-stopped-typing', { chatId });
        });

        // Join chat room
        socket.on('join-chat', (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.userId} joined chat: ${chatId}`);
        });

        // Leave chat room
        socket.on('leave-chat', (chatId) => {
            socket.leave(chatId);
            console.log(`User ${socket.userId} left chat: ${chatId}`);
        });

        // Send message (handled via HTTP but can emit updates)
        socket.on('send-message', (message) => {
            io.to(message.chat).emit('new-message', message);
        });

        // Message read receipt
        socket.on('message-read', (data) => {
            socket.to(data.chatId).emit('message-read-receipt', {
                messageId: data.messageId,
                readBy: data.userId
            });
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`❌ Socket disconnected: ${socket.id}`);

            const userId = connectedUsers.get(socket.id);

            if (userId) {
                // Update user's online status
                await User.findByIdAndUpdate(userId, {
                    socketId: null,
                    isOnline: false,
                    lastSeen: new Date()
                });

                // Notify others that user is offline
                socket.broadcast.emit('user-offline', {
                    userId,
                    lastSeen: new Date()
                });

                connectedUsers.delete(socket.id);
                console.log(`👤 User ${userId} went offline`);
            }
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });

    // Cleanup function
    const cleanup = async () => {
        console.log('🧹 Cleaning up socket connections...');
        // Set all users offline
        await User.updateMany(
            { isOnline: true },
            { isOnline: false, socketId: null, lastSeen: new Date() }
        );
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
};
