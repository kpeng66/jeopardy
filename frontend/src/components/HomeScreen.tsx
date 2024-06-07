import React, { useState } from 'react';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const HomeScreen: React.FC = () => {
    return (
        <Box className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <Typography variant="h3" component="h1" className="mb-8">
                Jeopardy
            </Typography>
            <Button variant="contained" color="primary" className="w-full mb-4">
                Host Game
            </Button>
        </Box>
    );
};

export default HomeScreen;