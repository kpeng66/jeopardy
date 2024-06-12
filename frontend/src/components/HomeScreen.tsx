import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Box} from '@mui/material';
import axios from 'axios';

const HomeScreen: React.FC = () => {
    const [loginUrl, setLoginUrl] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/login/google')
            .then(response => {
                setLoginUrl(response.data.url);
            })
            .catch(error => {
                console.error('Error fetching login URL', error);
            })
    }, []);

    const handleLogin = () => {
        window.location.href = loginUrl;
    }


    return (
        <Box className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <Typography variant="h3" component="h1" className="mb-8">
                Jeopardy
            </Typography>
            <Button variant="contained" color="primary" className="w-full mb-4" onClick={handleLogin}>
                Sign in with Google
            </Button>
            <Button variant="contained" color="primary" className="w-full mb-4">
                Host Game
            </Button>
        </Box>
    );
};

export default HomeScreen;