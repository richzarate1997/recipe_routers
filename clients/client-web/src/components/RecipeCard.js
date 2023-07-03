import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Box } from '@mui/system';

export default function RecipeCard({ imgUrl, imgDesc, description, name, cookTime }) {
    return (
        <Card sx={{ maxWidth: 345}}>
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
                    <Box sx={{
                        paddingTop: 4,
                        marginLeft: 2,
                        marginRight: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <AccessTimeOutlinedIcon />
                        <Typography>{cookTime}</Typography>
                    </Box>

                
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
