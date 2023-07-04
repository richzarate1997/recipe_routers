import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, Grid } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { maxWidth } from '@mui/system';

const imageUrl = "https://spoonacular.com/recipeImages/";
export default function RecipeCard({ imgUrl, name, cookTime, servings }) {
    return (
        <CardActionArea sx={{maxWidth: 345, minWidth:280}}>
            <Card sx={{ maxWidth: 345, minWidth:280, minHeight: 370 }} py={2}>

                <CardMedia
                    component="img"
                    height="175"
                    image={`${imageUrl}${imgUrl}`}
                    alt={name}


                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>

                    <Grid container px={2} pt={3} gutterBottom >
                        <Grid item xs={12} sm={6} md={4}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginRight: 6,
                                justifyContent: 'center'
                                
                            }}>
                            <AccessTimeOutlinedIcon />
                            <Typography>{cookTime} minutes</Typography>

                        </Grid>
                        <Grid item xs={12} sm={6} md={4}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                                <Box sx={{justifyContent: 'center'}}>
                                <MenuBookOutlinedIcon />    
                                </Box>
                            
                            <Typography>{servings} servings</Typography>
                        </Grid>
                    </Grid>


                </CardContent>

            </Card>
        </CardActionArea>
    );
}
