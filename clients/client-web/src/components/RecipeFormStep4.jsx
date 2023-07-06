import { Fragment, useState } from "react";
import { Typography, Box, InputBase} from "@mui/material";


const RecipeFormStep4 = ({ handleUploadImage, header }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(btoa(file));
        // const formData = new FormData();
        // formData.append('image', image);
        // formData.append('type', 'file');
        // nextRecipe.image = file;
    }

    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            <Box>
                <InputBase type="file" accept="image/*" onChange={handleImageChange}/>
            </Box>
        </Fragment>
    )
};

export default RecipeFormStep4