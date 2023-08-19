import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeCard from './RecipeCard';

function App() {
  const initialRecipes = [
    {
      foodName: 'Pasta Carbonara',
      ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan', 'Pepper'],
      instructions: '...',
    },
    // Add more initial recipe objects here
  ];

  const [recipes, setRecipes] = useState([]);

  // Load recipes from Local Storage when the component mounts
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || initialRecipes;
    setRecipes(savedRecipes);
  }, []);

  const addRecipe = () => {
    const newRecipe = {
      foodName: 'New Recipe',
      ingredients: [],
      instructions: '...',
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    // Save updated recipes to Local Storage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const updateRecipe = (index, updatedRecipe) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = updatedRecipe;
    setRecipes(updatedRecipes);
    // Save updated recipes to Local Storage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const deleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1); // Remove the recipe at the specified index
    setRecipes(updatedRecipes);
    // Save updated recipes to Local Storage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  return (
    <div className="App">
      <div className="taskbar">
        <h1>AutoRecipe</h1>
      </div>
      <div className="content">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            index={index}
            recipe={recipe}
            updateRecipe={updateRecipe}
            deleteRecipe={deleteRecipe} // Pass the deleteRecipe function
          />
        ))}
        <button onClick={addRecipe}>Add Recipe</button>
      </div>
    </div>
  );
}

export default App
