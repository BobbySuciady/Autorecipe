import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ index, recipe, updateRecipe, deleteRecipe }) => {
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: value,
    }));
  };

  const saveChanges = () => {
    updateRecipe(index, editedRecipe);
  };

  const handleDelete = () => {
    deleteRecipe(index);
  };

  return (
    <div className="recipe-card">
      <h2>{editedRecipe.foodName}</h2>
      <div className="recipe-card-content">
        <label>Food Name:</label>
        <input
          type="text"
          value={editedRecipe.foodName}
          onChange={(e) => handleInputChange(e, 'foodName')}
        />
        <label>Ingredients:</label>
        <textarea
          value={editedRecipe.ingredients}
          onChange={(e) => handleInputChange(e, 'ingredients')}
        />
        <label>Instructions:</label>
        <textarea
          value={editedRecipe.instructions}
          onChange={(e) => handleInputChange(e, 'instructions')}
        />
        <button onClick={saveChanges}>Save Changes</button>
        <button onClick={handleDelete}>Delete Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
