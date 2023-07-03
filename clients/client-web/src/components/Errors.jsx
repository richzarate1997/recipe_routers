import { Alert } from "@mui/material";


function Errors({ errors }) {

    return (
        <>
            { errors.length > 0 &&
                <Alert severity="error" style={{ display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <ul style={{listStyle: 'none'}}>
                        {typeof errors === Array
                            ? errors.map(err => <li key={err}>{err}</li>)
                            : <li>{errors}</li>
                        }
                    </ul>
                </Alert>
            }
        </>
    );
}

export default Errors;