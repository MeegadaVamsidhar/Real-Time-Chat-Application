import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.connected = false;
        this.listeners = new Map();
    }

    // Connect to Socket.io server
    connect(token) {
        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

        this.socket = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            autoConnect: true
        });

        // Connection event handlers
        this.socket.on('connect', () => {
            console.log('✅ Socket connected:', this.socket.id);
            this.connected = true;

            // Authenticate socket connection
            if (token) {
                this.socket.emit('authenticate', token);
            }
        });

        this.socket.on('authenticated', (data) => {
            console.log('✅ Socket authenticated:', data);
        });

        this.socket.on('auth-error', (error) => {
            console.error('❌ Socket authentication error:', error);
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Socket disconnected');
            this.connected = false;
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log('Socket reconnected after', attemptNumber, 'attempts');
        });

        return this.socket;
    }

    // Disconnect socket
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
            this.listeners.clear();
            console.log('Socket disconnected manually');
        }
    }

    // Join a chat room
    joinChat(chatId) {
        if (this.socket && chatId) {
            this.socket.emit('join-chat', chatId);
            console.log('Joined chat:', chatId);
        }
    }

    // Leave a chat room
    leaveChat(chatId) {
        if (this.socket && chatId) {
            this.socket.emit('leave-chat', chatId);
            console.log('Left chat:', chatId);
        }
    }

    // Send typing indicator
    startTyping(chatId, username) {
        if (this.socket && chatId) {
            this.socket.emit('typing-start', { chatId, username });
        }
    }

    // Stop typing indicator
    stopTyping(chatId) {
        if (this.socket && chatId) {
            this.socket.emit('typing-stop', { chatId });
        }
    }

    // Send message (optional - can also use HTTP)
    sendMessage(message) {
        if (this.socket) {
            this.socket.emit('send-message', message);
        }
    }

    // Mark message as read
    markMessageRead(messageId, chatId, userId) {
        if (this.socket) {
            this.socket.emit('message-read', { messageId, chatId, userId });
        }
    }

    // Listen for new messages
    onNewMessage(callback) {
        if (this.socket) {
            this.socket.on('new-message', callback);
            this.listeners.set('new-message', callback);
        }
    }

    // Listen for message deleted
    onMessageDeleted(callback) {
        if (this.socket) {
            this.socket.on('message-deleted', callback);
            this.listeners.set('message-deleted', callback);
        }
    }

    // Listen for typing indicator
    onUserTyping(callback) {
        if (this.socket) {
            this.socket.on('user-typing', callback);
            this.listeners.set('user-typing', callback);
        }
    }

    // Listen for stopped typing
    onUserStoppedTyping(callback) {
        if (this.socket) {
            this.socket.on('user-stopped-typing', callback);
            this.listeners.set('user-stopped-typing', callback);
        }
    }

    // Listen for user online
    onUserOnline(callback) {
        if (this.socket) {
            this.socket.on('user-online', callback);
            this.listeners.set('user-online', callback);
        }
    }

    // Listen for user offline
    onUserOffline(callback) {
        if (this.socket) {
            this.socket.on('user-offline', callback);
            this.listeners.set('user-offline', callback);
        }
    }

    // Listen for read receipts
    onMessageReadReceipt(callback) {
        if (this.socket) {
            this.socket.on('message-read-receipt', callback);
            this.listeners.set('message-read-receipt', callback);
        }
    }

    // Remove event listener
    off(eventName) {
        if (this.socket && this.listeners.has(eventName)) {
            const callback = this.listeners.get(eventName);
            this.socket.off(eventName, callback);
            this.listeners.delete(eventName);
        }
    }

    // Remove all listeners
    removeAllListeners() {
        if (this.socket) {
            this.listeners.forEach((callback, eventName) => {
                this.socket.off(eventName, callback);
            });
            this.listeners.clear();
        }
    }

    // Check if socket is connected
    isConnected() {
        return this.connected && this.socket?.connected;
    }

    // Get socket instance
    getSocket() {
        return this.socket;
    }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
