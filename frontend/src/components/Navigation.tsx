import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Navigation: React.FC = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <AppBar position="static" className="bg-gray-800">
            <Toolbar className="justify-between">
                <Typography variant="h6" className="text-white">
                    JWT Authentication
                </Typography>
                <Box>
                    {isAuth ? (
                        <>
                            <Button color="inherit" href="/" className="text-white mx-2">
                                Home
                            </Button>
                            <Button color="inherit" href="/logout" className="text-white mx-2">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" href="/login" className="text-white mx-2">
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;