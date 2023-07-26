import Home from "./components/views/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Recipe from "./components/views/RecipeResults";
import ShowRecipe from "./components/views/ShowRecipe";
import About from "./components/views/About"
import Profile from "./components/views/Profile";
import Login from "./components/views/Login";
import Footer from "./components/Footer";
import GroceryListForm from "./components/forms/GroceryListForm";
import RecipeForm from "./components/forms/RecipeForm";
import NotFound from "./components/views/NotFound";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { refreshToken, signOut } from "./service/authApi";
import AuthContext from "./contexts/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material"
import './App.css';
import AddGroceries from "./components/AddGroceries";
import FavoriteRecipesList from "./components/FavoriteRecipesList";


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
    if (auth.user.username) {
      refreshToken()
        .then(existingUser => {
          setUser(existingUser);
          setTimeout(refreshUser, WAIT_TIME);
        })
        .catch(() => auth.signOut());
    }
  }, []);

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={auth}>
                <Router>
                    <ResponsiveAppBar />
                    <Routes style={{ height: '100%'}}>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipes" element={<Recipe />} />
                        <Route path="/search/:param" element={<Recipe />} />
                        <Route path="/recipe/:id" element={<ShowRecipe userId={user.appUserId}/>} />
                        <Route path="/add/ingredient" element={<AddGroceries />} />
                        <Route path="/new/recipe" element={
                            auth.isLoggedIn()
                                ? <RecipeForm />
                                : <Navigate to="/recipes" />
                        } />
                        <Route path="/add/grocerylist" element={
                            auth.isLoggedIn()
                                ? <GroceryListForm />
                                : <Navigate to="/recipes" />
                        } />
                        <Route path="/myfavorites" element={
                            auth.isLoggedIn()
                                ? <FavoriteRecipesList />
                                : <Navigate to="/recipes" />
                        } />
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
                        <Route path="/notfound" element={<NotFound />} />
                        <Route path="*" element={<Navigate to={'/notfound'} />} />
                    </Routes>
                    <Footer />
                </Router>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
