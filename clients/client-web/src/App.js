import Home from "./components/views/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Recipe from "./components/views/Recipe";
import About from "./components/views/About"
import Profile from "./components/views/Profile";
import Login from "./components/views/Login";
import Footer from "./components/Footer";
import IngredientForm from "./components/forms/IngredientForm";
import GroceryListForm from "./components/forms/GroceryListForm";
import RecipeForm from "./components/forms/RecipeForm";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { refreshToken, signOut } from "./service/authApi";
import AuthContext from "./contexts/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material"

const EMPTY_USER = {
    username: '',
    roles: []
};

const WAIT_TIME = 1000 * 60 * 14;

function App() {
    const [user, setUser] = useState(EMPTY_USER);

    const auth = {
        user: user,
        isLoggedIn() {
            return !!user.username;
        },
        hasRole(role) {
            return user.roles.includes(role);
        },
        onAuthenticated(user) {
            setUser(user);
            setTimeout(refreshUser, WAIT_TIME);
        },
        signOut() {
            setUser(EMPTY_USER);
            signOut();
        }
    };

    const refreshUser = useCallback(() => {
        refreshToken()
            .then(existingUser => {
                setUser(existingUser);
                setTimeout(refreshUser, WAIT_TIME);
            })
            .catch(err => {
                console.log(err);
                auth.signOut();
            });
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#7CA65A',
                contrastText: '#fff'
            },
            secondary: {
                main: "#FEAE65"
            }
            // warning: {
            //     main: '#CA5953'
            // },
            // danger: {
            //     main: '#612D33'
            // },
            // info: {
            //     main: '#D1483D'
            // }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={auth}>
                <Router>
                    <ResponsiveAppBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipes" element={<Recipe />} />
                        <Route path="/new/recipe" element={<RecipeForm />} />
                        <Route path="/add/grocerylist" element={<GroceryListForm />} />
                        <Route path="/ingredient" element={<IngredientForm />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={
                            auth.isLoggedIn()
                                ? <Profile appUser={auth.user} />
                                : <Navigate to='/' />
                        } />
                        <Route path="/login" element={
                            auth.isLoggedIn()
                                ? <Navigate to='/profile' />
                                : <Login heading="Sign In" buttonText="Sign In" />
                        } />
                        <Route path="/register" element={
                            auth.isLoggedIn()
                                ? <Navigate to='/profile' />
                                : <Login heading="Register" buttonText="Register" isRegistration={true} />
                        } />
                    </Routes>
                    <Footer />
                </Router>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
