import { Alert, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";


function Errors({ errs }) {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        // if (typeof errs === String) {
        //     setErrors[errs]
        // } else {
        //     setErrors(errs);
        // }
        console.log(errs)
    }, [errs]);
    return (
        <>
            { errors.length > 0 &&
                <Alert severity="error" style={{ display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <List>
                        {typeof errors === Array
                            ? errors.map(err => <ListItem key={err}><ListItemText primary={err} /></ListItem>)
                            : <ListItem><ListItemText primary={errors} /></ListItem>
                        }
                    </List>
                </Alert>
            }
        </>
    );
}

export default Errors;