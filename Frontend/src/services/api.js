import API from '../utils/api';

// ============================================
// AUTHENTICATION API
// ============================================

export const authAPI = {
    // Register new user
    register: async (userData) => {
        const response = await API.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await API.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Logout user
    logout: async () => {
        const response = await API.get('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return response.data;
    },

    // Get current user
    getMe: async () => {
        const response = await API.get('/auth/me');
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Update profile
    updateProfile: async (profileData) => {
        const response = await API.put('/auth/update-profile', profileData);
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Change password
    changePassword: async (passwordData) => {
        const response = await API.put('/auth/change-password', passwordData);
        return response.data;
    }
};

// ============================================
// USERS API
// ============================================

export const usersAPI = {
    // Get all users (with optional search)
    getUsers: async (searchQuery = '') => {
        const response = await API.get('/users', {
            params: { search: searchQuery }
        });
        return response.data;
    },

    // Get user by ID
    getUserById: async (userId) => {
        const response = await API.get(`/users/${userId}`);
        return response.data;
    }
};

// ============================================
// CHATS API
// ============================================

export const chatsAPI = {
    // Get all chats for current user
    getChats: async () => {
        const response = await API.get('/chats');
        return response.data;
    },

    // Create or get one-to-one chat
    createChat: async (userId) => {
        const response = await API.post('/chats', { userId });
        return response.data;
    },

    // Create group chat
    createGroupChat: async (chatData) => {
        const response = await API.post('/chats/group', chatData);
        return response.data;
    },

    // Get single chat
    getChat: async (chatId) => {
        const response = await API.get(`/chats/${chatId}`);
        return response.data;
    },

    // Update group chat
    updateGroupChat: async (chatId, updateData) => {
        const response = await API.put(`/chats/${chatId}`, updateData);
        return response.data;
    },

    // Add participant to group
    addParticipant: async (chatId, userId) => {
        const response = await API.put(`/chats/${chatId}/add-participant`, { userId });
        return response.data;
    },

    // Remove participant from group
    removeParticipant: async (chatId, userId) => {
        const response = await API.put(`/chats/${chatId}/remove-participant`, { userId });
        return response.data;
    },

    // Delete chat
    deleteChat: async (chatId) => {
        const response = await API.delete(`/chats/${chatId}`);
        return response.data;
    }
};

// ============================================
// MESSAGES API
// ============================================

export const messagesAPI = {
    // Get messages for a chat
    getMessages: async (chatId, page = 1, limit = 50) => {
        const response = await API.get(`/messages/${chatId}`, {
            params: { page, limit }
        });
        return response.data;
    },

    // Send message
    sendMessage: async (messageData) => {
        const response = await API.post('/messages', messageData);
        return response.data;
    },

    // Mark message as read
    markAsRead: async (messageId) => {
        const response = await API.put(`/messages/${messageId}/read`);
        return response.data;
    },

    // Delete message
    deleteMessage: async (messageId) => {
        const response = await API.delete(`/messages/${messageId}`);
        return response.data;
    }
};

export default {
    auth: authAPI,
    users: usersAPI,
    chats: chatsAPI,
    messages: messagesAPI
};
