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
function App() {
  return (
    <>
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
          <Route path="/" element={<Home />}/>
        </Routes>
      </Router>

    </>
  );
}

export default App;
