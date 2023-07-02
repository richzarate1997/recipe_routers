import { Alert } from "@mui/material";


function Errors({ errors }){
    const getErrorList = (error) => {
        if(Array.isArray(error)) {
            return error;
        } else {
            return [error];
        }
    }

    return (
        <>
            {getErrorList(errors).length > 0 && <Alert severity="error">
                <ul>
                    {getErrorList(errors).map(err => <li key={err}>{err}</li>)}
                </ul>
                </Alert>}
        </>
    );
}

export default Errors;