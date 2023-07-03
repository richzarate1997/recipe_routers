import Home from "./components/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Recipe from "./components/Recipe";
import About from "./components/About"
import Profile from "./components/Profile";
import Login from "./components/Login";
import Footer from "./components/Footer";
import IngredientForm from "./components/forms/IngredientForm";
import GroceryListForm from "./components/forms/GroceryListForm";
import RecipeForm from "./components/forms/RecipeForm";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { refreshToken, signOut } from "./service/authApi";
import AuthContext from "./contexts/AuthContext";

const EMPTY_USER = {
    username: '',
    roles: []
};

const WAIT_TIME = 1000 * 60 * 14;

function App() {
    const [user, setUser] = useState(EMPTY_USER);

    const refreshUser = useCallback(() => {
        refreshToken()
            .then(existingUser => {
                setUser(existingUser);
                setTimeout(refreshUser, WAIT_TIME);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

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
    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <ResponsiveAppBar />
                <Footer />
                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Recipes" element={<Recipe />} />
                    <Route path="/RecipeForm" element={<RecipeForm />} />
                    <Route path="/GroceryListForm" element={<GroceryListForm />} />
                    <Route path="/IngredientForm" element={<IngredientForm />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>

        </AuthContext.Provider>
    );
}

export default App;
