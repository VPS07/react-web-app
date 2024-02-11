import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: 6
            }}>
            <Typography variant="h3" align="center">
                Welcome to Transaction App!
            </Typography>
            <Typography variant="body1">
                Easily manage your cryptocurrency transactions with our simple and secure platform.
            </Typography>
            <Stack spacing={2} direction={"row"} >
                <Button variant="contained" component={Link} to="/transaction">
                    Add Transaction
                </Button>
                <Button variant="contained" component={Link} to="/data">
                    View Transactions
                </Button>
            </Stack>
        </Box>

    );
};

export default HomePage;
