import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Slide from '../Components/RevealComponents/Slide';
const PresentationLayout = () => (
    <Slide>
        <Grid container spacing={2}>
            <Grid item xs={10}>
                {/* Main content */}
                <Paper elevation={0} style={{ width: '80vh', height: '25vh' }}>
                    {/* Main content */}
                    <Typography variant="h1">Title</Typography>
                </Paper>
                <Paper elevation={0} style={{ width: '80vh', height: '20vh' }}>
                    {/* Main content */}
                    <Typography variant="h6">HU Xin</Typography>
                    <Typography variant="h6">2023/06/16</Typography>
                </Paper>

            </Grid>

        </Grid>
    </Slide>
);

export default PresentationLayout;