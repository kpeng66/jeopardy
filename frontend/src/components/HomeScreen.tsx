import React, { useState } from 'react';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const HomeScreen: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        handleClose();
        const url = "http://localhost:8000/players/";
        const payload = {
            name: name
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();
            console.log('Player created:', responseData);

            setName('');
        } catch (error) {
            console.error('Failed to create player:', error);
        }
    };

    return (
        <Box className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <Typography variant="h3" component="h1" className="mb-8">
                Spyfall
            </Typography>
            <Button variant="contained" color="primary" className="w-full mb-4" onClick={handleOpen}>
                Host Game
            </Button>
            <Button variant="contained" color="primary" className="w-full mb-4">
                Join Game
            </Button>
            <Button variant="outlined" className="w-full">
                How to play
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>What's your name, Sherlock?</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Let's Go</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HomeScreen;