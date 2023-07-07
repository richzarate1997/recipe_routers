import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { authenticate } from "../../service/authApi";
import { TextField, Avatar, Button, FormControlLabel, Container, Box, Grid, Checkbox, Typography, Tooltip } from "@mui/material";
import LoginErrors from "../LoginErrors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


function Login(props) {
    const location = useLocation();
    const { heading, buttonText, isRegistration } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const passwordInputType = showPassword ? "text" : "password";
    
    const auth = useContext(AuthContext);

    const handleChange = (event) => {
        const nextCredentials = { ...credentials };
        nextCredentials[event.target.name] = event.target.value;
        setCredentials(nextCredentials);
    };

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isRegistration = location.pathname === "/register";
        authenticate(credentials, isRegistration)
            .then(user => {
                auth.onAuthenticated(user);
            })
            .catch(error => setErrors(error));
    };
    
    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '70vh'}}>
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
                    {heading}
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
                        type={passwordInputType}
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        label="Show password"
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                checked={showPassword}
                                onChange={handleShowPasswordChange}
                            />
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {buttonText}
                    </Button>
                    <Grid container>
                        {isRegistration ? null : (
                            <Grid item xs>
                                <Tooltip title="Well that sucks!">
                                    <Link variant="body2">
                                        Forgot password?
                                    </Link>
                                </Tooltip>
                            </Grid>
                        )}
                        <Grid item>
                            <Link to={isRegistration ? "/login" : "/register"} variant="body2">
                                {isRegistration ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <LoginErrors errs={errors} />
        </Container>
    )
}

export default Login;