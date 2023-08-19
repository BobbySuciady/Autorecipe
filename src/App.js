import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeCard from './RecipeCard';
import ChatGPT from './ChatGPT';

function App() {
  const initialRecipes = [
    {
      foodName: 'Pasta Carbonara',
      ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan', 'Pepper'],
      instructions: '...',
    },
  ];

  const [recipes, setRecipes] = useState([]);

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
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const updateRecipe = (index, updatedRecipe) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = updatedRecipe;
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const deleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
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
            deleteRecipe={deleteRecipe}
          />
        ))}
        <button onClick={addRecipe}>Add Recipe</button>
      </div>
      <ChatGPT />
    </div>
  );
}

export default App
