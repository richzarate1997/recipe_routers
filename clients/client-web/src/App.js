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
import { findUser } from "./service/userApi";
import AuthContext from "./contexts/AuthContext";

const EMPTY_USER = {
    username: '',
    roles: []
};

const EMPTY_USER_PROPS = {
    displayName: '',
    isMetric: false,
    myRecipes: [],
    myFavorites: [],
    myLists: []
}

const WAIT_TIME = 1000 * 60 * 14;

function App() {
    const [user, setUser] = useState(EMPTY_USER);
    const [userProps, setUserProps] = useState(EMPTY_USER_PROPS);

    const auth = {
        user: user,
        userProps: userProps,
        isLoggedIn() {
            return !!user.username;
        },
        hasRole(role) {
            return user.roles.includes(role);
        },
        onAuthenticated(user) {
            setUser(user);
            setTimeout(refreshUser, WAIT_TIME);
            findUser()
                .then(data => setUserProps(data))
                .catch(err => console.log(err));
        },
        signOut() {
            setUser(EMPTY_USER);
            setUserProps(EMPTY_USER_PROPS);
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

    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <ResponsiveAppBar />
                <Routes>
                    <Route path="/recipes" element={<Recipe />} />
                    <Route path="/new/recipe" element={<RecipeForm />} />
                    <Route path="/add/grocerylist" element={<GroceryListForm />} />
                    <Route path="/ingredient" element={<IngredientForm />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={
                        auth.isLoggedIn()
                            ? <Profile />
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
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </Router>

        </AuthContext.Provider>
    );
}

export default App;
