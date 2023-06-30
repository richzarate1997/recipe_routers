import Home from "./components/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Recipe from "./components/Recipe";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipe />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
