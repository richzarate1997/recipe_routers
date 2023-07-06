import { Fragment, createRef, useRef, useState } from "react";
import { Typography, Box, InputBase, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const RecipeFormStep4 = ({ handleUploadImage, header }) => {
    // const [image, setImage] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const image = useRef("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        image.current.value = btoa(file);
        // const formData = new FormData();
        // formData.append('image', image);
        // formData.append('type', 'file');
        // nextRecipe.image = file;
    }

    const handleSubmitImage = () => {
        console.log(image.current.valueOf)
        if (uploaded && image.current.valueOf !== "") {
            setUploaded(false);
            image.current.value = "";
        } else if(!uploaded && image.current.valueOf) {
            setUploaded(true);
        }
        handleUploadImage(image);
    }
    

    return (
        <Fragment>
            <Typography variant="h4" p={2}>{header}</Typography>
            {<Box>
                <InputBase type="file" accept="image/*" onChange={handleImageChange} image={image} />
                {!uploaded
                    ? <Button variant="contained" onClick={handleSubmitImage} >
                        Upload
                    </Button>
                    : <IconButton
                        variant="contained"
                        style={{ backgroundColor: "#612D33", color: '#fff' }}
                        onClick={handleSubmitImage}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            </Box>}
        </Fragment>
    )
};

export default RecipeFormStep4