import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

        try {
            const { data } = await axios.post('http://localhost:8000/token/', user, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            window.location.href = '/';
        } catch (error) {
            console.error('Login error', error);
        }
    }
    return (
        <div>

        </div>
    );
};

export default Login;