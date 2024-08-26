import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipiePage from './pages/RecipiePage'; // Ensure you import the RecipiePage correctly
import RecipieAdmin from './pages/RecipieAdmin';
import RecipeImagePage from './pages/RecipeImagePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/Recipie" element={<RecipiePage />} exact />
          <Route path="/RecipieAdmin" element={<RecipieAdmin />} exact />
          <Route path="/recipe-image/:id" element={<RecipeImagePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
