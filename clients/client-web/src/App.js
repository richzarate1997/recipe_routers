import { ThemeProvider, createTheme } from "@mui/material"
import { useState, useEffect, useCallback, useDeferredValue } from "react";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import './App.css';
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
import AddGroceries from "./components/AddGroceries";
import FavoriteRecipesList from "./components/FavoriteRecipesList";
import AuthContext from "./contexts/AuthContext";
import { refreshToken, signOut } from "./service/authApi";


const EMPTY_USER = {
  username: '',
  roles: []
};

const WAIT_TIME = 1000 * 60 * 14;

function App() {
  const [user, setUser] = useState(EMPTY_USER);
  
  useEffect(() => {
    refreshToken()
      .then(existingUser => setUser(existingUser))
      .catch(() => auth.signOut());
  }, []);

  const auth = {
    user: user,
    isLoggedIn() {
      return !!localStorage.getItem('jwt_token');
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
    if (auth.user.appUserId) {
      refreshToken()
        .then(existingUser => {
          setUser(existingUser);
          setTimeout(refreshUser, WAIT_TIME);
        })
        .catch(() => auth.signOut());
    }
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
      },
      warning: {
        main: '#CA5953'
      },
      danger: {
        main: '#612D33'
      },
      info: {
        main: '#D1483D'
      }
    },
  });

  const mayRedirect = (happyPath, sadPath) => {
    return auth.isLoggedIn() ? happyPath : sadPath;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={auth}>
        <Router>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipe />} />
            <Route path="/search/:param" element={<Recipe />} />
            <Route path="/recipe/:id" element={<ShowRecipe userId={user.appUserId} />} />
            <Route path="/add/ingredient" element={<AddGroceries />} />
            <Route path="/new/recipe" element={mayRedirect(<RecipeForm />, <Navigate to="/recipes" />)} />
            <Route path="/edit/recipe/:id" element={mayRedirect(<RecipeForm userId={auth.user.appUserId}/>, <Navigate to="/recipes" />)} />
            <Route path="/add/grocerylist" element={mayRedirect(<GroceryListForm />, <Navigate to="/recipes" />)} />
            <Route path="/myfavorites" element={mayRedirect(<FavoriteRecipesList />, <Navigate to="/recipes" />)} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={mayRedirect(<Profile appUser={auth.user} />, <Navigate to='/' />)} />
            <Route path="/login" element={mayRedirect(<Navigate to='/profile' />, <Login purpose="Sign In" />)} />
            <Route path="/register" element={
              mayRedirect(<Navigate to='/profile' />, <Login purpose="Register" isRegister={true} />)
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