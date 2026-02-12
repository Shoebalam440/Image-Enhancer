import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await client.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await client.post('/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const googleLogin = async (token) => {
        try {
            // Store token temporarily so client interceptor picks it up
            localStorage.setItem('user', JSON.stringify({ token }));

            // Get user data
            const { data } = await client.get('/auth/me');

            // Merge token with user data
            const fullUser = { ...data, token };

            setUser(fullUser);
            localStorage.setItem('user', JSON.stringify(fullUser));
            return { success: true };
        } catch (error) {
            console.error(error);
            localStorage.removeItem('user'); // Clean up if failed
            return {
                success: false,
                message: error.response?.data?.message || 'Google login failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
