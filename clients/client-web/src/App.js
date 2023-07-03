import Home from "./components/views/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Recipe from "./components/Recipe";
import About from "./components/views/About"
import Profile from "./components/views/Profile";
import Login from "./components/views/Login";
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
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </Router>

        </AuthContext.Provider>
    );
}

export default App;
