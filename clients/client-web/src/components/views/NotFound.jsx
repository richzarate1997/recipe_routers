import { Card, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
    const location = useLocation();
    const styles = {
        paper: {
            textAlign: 'center',
            width: '50vw',
            margin: 'auto',
            height: '78vh',
            borderRadius: '25px'
        },
        card: {
            padding: '10px',
            borderRadius: '25px'
        },
        img: { borderRadius: '25px' }
    }
    return (
        <Paper elevation={3} style={styles.paper}>
            <Typography m={4} variant='h3'>Not Found</Typography>
            <Card sx={styles.card}>
                <CardContent>
                    <Typography variant='h5' color="">
                        {location.state
                            ? location.state.msg
                            : `Ah cheese! This was a fruitless endeavor, if we're not mis-steak-en. To get out of this pickle, lettuce try something else.`
                        }
                    </Typography>
                </CardContent>
                <CardMedia
                    sx={styles.img}
                    component="img"
                    image='/images/sad_plate.jpg'
                    alt="empty plate is sad"
                />
            </Card>
        </Paper>
    )
}

export default NotFound