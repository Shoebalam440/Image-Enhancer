const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Attempting login with invalid credentials...');
        try {
            await axios.post('http://localhost:5000/api/auth/login', {
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        } catch (error) {
            console.log('Expected error:', error.response?.data || error.message);
        }

        console.log('Attempting registration...');
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';
        try {
            const regRes = await axios.post('http://localhost:5000/api/auth/register', {
                name: 'Test User',
                email,
                password
            });
            console.log('Registration success:', regRes.data);

            console.log('Attempting login with new user...');
            const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            console.log('Login success:', loginRes.data);
        } catch (error) {
            console.error('Auth flow failed:', error.response?.data || error.message);
        }

    } catch (err) {
        console.error('Test script error:', err);
    }
};

testLogin();
