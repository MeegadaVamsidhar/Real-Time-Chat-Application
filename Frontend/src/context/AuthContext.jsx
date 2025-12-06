import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import socketService from '../services/socket';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize - check if user is already logged in
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');

                if (token && savedUser) {
                    setUser(JSON.parse(savedUser));

                    // Verify token is still valid
                    try {
                        const response = await authAPI.getMe();
                        setUser(response.user);

                        // Connect socket
                        socketService.connect(token);
                    } catch (err) {
                        // Token invalid, clear everything
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                    }
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Register new user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.register(userData);
            setUser(response.user);

            // Save to localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Connect socket
            socketService.connect(response.token);

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.login(credentials);
            setUser(response.user);

            // Save to localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Connect socket
            socketService.connect(response.token);

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = async () => {
        try {
            setLoading(true);
            await authAPI.logout();

            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Disconnect socket
            socketService.disconnect();

            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
            // Ensure local cleanup happens even if API fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            socketService.disconnect();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Update user profile
    const updateProfile = async (profileData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.updateProfile(profileData);
            setUser(response.user);

            // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.user));

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Profile update failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Change password
    const changePassword = async (passwordData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.changePassword(passwordData);
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Password change failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
