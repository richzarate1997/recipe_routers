import { useContext, useState } from "react";
import { useNavigate} from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { authenticate } from "../../service/authApi";
import { TextField, Avatar, Button, FormControlLabel, Container, Box, Grid, Checkbox, Typography, Tooltip } from "@mui/material";
import Errors from "../Errors";
import LockOutlinedIcon  from "@mui/icons-material/LockOutlined";


function Login() {
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleChange = (event) => {
        const nextCredentials = { ...credentials };
        nextCredentials[event.target.name] = event.target.value;
        setCredentials(nextCredentials);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate(credentials).then(user => {
            auth.onAuthenticated(user);
            navigate(-1); // might wanna make sure this works c:
        })
            .catch(error => setErrors(error));
    };
    // TODO attach handlers to form functions
    return (
        <Container component="main" maxWidth="xs" >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#612D33' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
                        name="username"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Tooltip title="Well that sucks!">
                            <Link variant="body2">
                                Forgot password?
                            </Link>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Errors errors={errors} />
        </Container>
    )
}

export default Login;