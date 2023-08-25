import { Alert, List, ListItem, ListItemText } from "@mui/material";


function Errors({ errs }) {
    return (
        <>
            { errs.length > 0 &&
                <Alert severity="error" style={{ display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <List>
                        {typeof errs === Array
                            ? errs.map(err => <ListItem key={err}><ListItemText primary={err} /></ListItem>)
                            : <ListItem><ListItemText primary={errs} /></ListItem>
                        }
                    </List>
                </Alert>
            }
        </>
    );
}

export default Errors;