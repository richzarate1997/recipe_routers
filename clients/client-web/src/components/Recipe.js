import { Box } from "@mui/system";
import RecipeCard from "./RecipeCard";
function Recipe() {
    return (
        <Box mx={4} sx={{paddingTop: 2}}>
            <RecipeCard  imgUrl="https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg" 
            imgDesc="Tomato sauce rotinin pasta" 
            name="Red Sauce Pasta" 
            description="Craving a simple, cozy pasta? Try this Classic Red Sauce Pasta recipe! Like any great Italian recipe, it features simple, classic ingredients simmered until they meld into a savory, velvety tomato sauce. This one is based on a real Italian grandmother’s recipe (so you know it’s good!). Throw it onto pasta with a little salty Parmesan or Pecorino Romano cheese, and it’s simply divine. This one went over very well in our house: each of us huddled over our cozy bowls…and refusing to share!"
            cookTime="30 min"
            />
        </Box>
    );
}

export default Recipe;