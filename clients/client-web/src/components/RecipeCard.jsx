import {
    Card, CardActionArea,
    CardContent, CardMedia,
    Box, Grid, Tooltip, Typography
} from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

const imageUrl = "https://spoonacular.com/recipeImages/";


export default function RecipeCard({ id, imgUrl, name, cookTime, servings, sourceUrl }) {
    // const navigate = useNavigate();
    // const getRecipe = () => {
    //     // UNFINISHED -- break these calls out into a service to
    //     if (sourceUrl !== '') { // if the recipe has a sourceUrl, don't try to save it.
    //         // const newId = fetchRecipe({name, cookTime, servings})
    //             // .then(data => {
    //             //     console.log(data)
    //             // })
    //             // .catch(err => console.log(err))
            
    //     } else { // otherwise save it to db
            
    //     }
    //     //navigate(`/recipe/${newId}`);
    // }
    
    return (
        <CardActionArea sx={{ width: 345 }}>
            <Tooltip title={name} placement='top' arrow>
                <Card
                    sx={{ width: 345, height: 370 }}
                    py={2} 
                    // Do not Uncomment this!
                    //onClick={fetchRecipe(id, name, cookTime, servings)}
                >
                    <CardMedia
                        component="img"
                        height="175"
                        image={`${imageUrl}${imgUrl}`}
                        alt={name} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                            {name}
                        </Typography>
                        <Grid container px={2} pt={3} >
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
                                <Box sx={{ justifyContent: 'center' }}>
                                    <MenuBookOutlinedIcon />
                                </Box>
                                <Typography>{servings} servings</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Tooltip>
        </CardActionArea>
    );
}
