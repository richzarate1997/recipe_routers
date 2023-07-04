import { Divider, Grid, Typography} from "@mui/material";
import ProfileCard from "../ProfileCard";
import { Container } from "@mui/system";
import alice from "../../assets/alice.jpg";
import kern from "../../assets/kern.jpg";
import richard from "../../assets/richard.jpg"

const aboutblurb = "GetYum is a recipe-to-shopping list application that is built on Spoonacular API, a React UI, and Java with MySQL server and database, built by our team, React Routers. The goal of GetYum is to create an all-in-one space for browsing, creating, and saving recipes such that you have somewhere to directly create a grocery list that has all the items you need to make your recipes. With GetYum, you'll no longer have to make multiple trips to the grocery store to pick up that one ingredient you missed for your favorite recipe. \n\nRecipe Routers is a team made from members of Dev10's cohort 55. The members of Recipe Routers come from different backgrounds and partook in a fast paced full stack Java training; GetYum is our final capstone for this program.";

function About() {
    
    return (
        <Container>
            
            <Typography variant="h3" pt={2}>About Us</Typography>
            <Divider></Divider>
            <Typography variant="body1" sx={{
                padding: 3,
                fontSize: 20,
                lineHeight: 2.5
            }}>{aboutblurb}</Typography>
            <Typography variant="h3" pt={2}>Meet the Routers</Typography>
            <Divider></Divider>
            <Grid container spacing={2} mx='auto' my={2}>
                <Grid item xs={12} sm={6} md={4}>
                <ProfileCard 
                    imgUrl={kern}
                    imgDesc="a picture of Coren 'Kern' Frankel"
                    name="Coren 'Kern' Frankel"
                    description="An avid puzzle-solver and cinephile, Kern likes to spend his free time waxing philosophical with his wife and arguing about the meaning of life."
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <ProfileCard 
                    imgUrl={alice}
                    imgDesc="a picture of Alice Wu"
                    name="Alice Wu"
                    description="Rocking a bowl cut and circular glasses for half of her life, Alice enjoys building keyboards, playing games, and cooking in her spare time. "
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <ProfileCard 
                    imgUrl={richard}
                    imgDesc="a picture of Richard Zarate"
                    name="Richard Zarate"
                    description="If you know Richard you know he's always on the go. Keeping an active body and mind is the goal. You can usually find him coding, traveling or walking his dog Niko"
                />
                </Grid>
                
            </Grid>
            
        </Container>

    );
}

export default About;