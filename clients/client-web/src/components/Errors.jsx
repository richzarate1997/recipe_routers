import { Alert, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";


function Errors({ errs }) {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setErrors(errs);
    }, [errs]);
    return (
        <>

            <Alert severity="error" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <List>
                    {typeof errors === 'object'
                        ? errors.map(err => <ListItem key={err}><ListItemText primary={err} /></ListItem>)
                        : <ListItem><ListItemText primary={errors} /></ListItem>
                    }
                </List>
            </Alert>
        </>
    );
}

export default Errors;