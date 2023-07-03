import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";


function ProfileCard({imgUrl, imgDesc, name, description}) {
    return (
        <Card sx={{ maxWidth: 350}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imgUrl}
                    alt={imgDesc}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProfileCard;