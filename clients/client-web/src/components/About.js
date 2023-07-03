import { Grid, Typography} from "@mui/material";
import ProfileCard from "./ProfileCard";
import { Container } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";


function About() {
    
    return (
        <Container>
            <CssBaseline />
            <Typography variant="h3">About Us</Typography>
            <Typography variant="body1">text</Typography>
            <Typography variant="h3">Meet the Team</Typography>
            <Grid container spacing={2} mx='auto' my={2}>
                <Grid item xs={12} sm={6} md={4}>
                <ProfileCard 
                    imgUrl=""
                    imgDesc="a picture of Alice Wu"
                    name="Alice Wu"
                    description="A recent graduate from UIUC"
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <ProfileCard 
                    imgUrl=""
                    imgDesc="a picture of Alice Wu"
                    name="Alice Wu"
                    description="A recent graduate from UIUC"
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <ProfileCard 
                    imgUrl=""
                    imgDesc="a picture of Alice Wu"
                    name="Alice Wu"
                    description="A recent graduate from UIUC"
                />
                </Grid>
                
            </Grid>
            
        </Container>

    );
}

export default About;