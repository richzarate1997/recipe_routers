import { Card, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
    const location = useLocation();
    const styles = {
        paper: {
            textAlign: 'center',
            width: '50vw',
            margin: '60px auto',
            color: '#FEAE65',
            backgroundColor: '#612D33',
            padding: '20px',
            borderRadius: '25px'
        },
        img: { borderRadius: '25px', height: '40vh', width: 'auto', margin: 'auto' }
    }
    return (
        <Paper elevation={3} style={styles.paper}>
            <Typography m={4} variant='h3'>Not Found</Typography>
                    <Typography variant='h5' color="">
                        {location.state
                            ? location.state.msg
                            : `Ah cheese! This was a fruitless endeavor, if we're not mis-steak-en. To get out of this pickle, lettuce try something else.`
                        }
                    </Typography>
                <CardContent>
                </CardContent>
                <CardMedia
                    sx={styles.img}
                    component="img"
                    image='/images/sad_plate.jpg'
                    alt="empty plate is sad"
                />
        </Paper>
    )
}

export default NotFound