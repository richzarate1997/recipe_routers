import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Box, Typography, } from '@mui/material';
import Ingredient from './Ingredient';
import { Checkbox, FormControlLabel } from '@mui/material'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const GroceryListPanel = ({list, value, index}) => {
    const [ingredients, setIngredients] = useState(list);
    

    // const renderIngredients = (list) => {
    //     return list.map((ing) => {
    //     <FormControlLabel 
    //     label={ing.name}
    //     labelPlacement='end'
    //     control={<Checkbox />} />
    // })
    // }
    
    useEffect(() => {
        setIngredients(list);
        console.log(list);
        
    }, []);
    
    return (
        <>
        <TabPanel value={value} index={index}>
            {ingredients.length > 0 && ingredients.map(ingredient => 
                <Ingredient ing={ingredient} />
            )}
            </TabPanel>
          </>  
       
    
    )
}

export default GroceryListPanel;