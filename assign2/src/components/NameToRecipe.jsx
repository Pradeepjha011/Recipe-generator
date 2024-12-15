import React, { useState } from 'react';
import axios from 'axios';

// Replace with your Spoonacular API Key
const API_KEY = 'fa723c6eb01948618fb63c9af0483425';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';
const RECIPE_INFO_URL = 'https://api.spoonacular.com/recipes';

const App = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the input change
  const handleInputChange = (event) => {
    setRecipeName(event.target.value);
  };

  // Fetch recipe by name
  const fetchRecipe = async () => {
    if (!recipeName) return;

    setLoading(true);
    setError(null);

    try {
      // First, fetch basic recipe info (including the ID)
      const searchResponse = await axios.get(`${BASE_URL}?query=${recipeName}&apiKey=${API_KEY}`);
      const recipe = searchResponse.data.results[0]; // Get the first result

      if (recipe) {
        // Fetch detailed recipe info by ID
        const recipeDetailResponse = await axios.get(`${RECIPE_INFO_URL}/${recipe.id}/information?apiKey=${API_KEY}`);

        // Log the response to check the structure of the data
        console.log('Recipe Detail Response:', recipeDetailResponse.data);

        // Check the ingredients structure
        console.log('Ingredients:', recipeDetailResponse.data.extendedIngredients);

        // Update state with full recipe data
        setRecipeData({
          title: recipeDetailResponse.data.title,
          image: recipeDetailResponse.data.image,
          ingredients: recipeDetailResponse.data.extendedIngredients, // Full ingredients list
          instructions: recipeDetailResponse.data.instructions, // Full instructions
        });
      } else {
        setError('No recipe found.');
      }
    } catch (error) {
      setError('Error fetching recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>

      <input
        type="text"
        placeholder="Enter a dish name..."
        value={recipeName}
        onChange={handleInputChange}
      />
      <button onClick={fetchRecipe} disabled={loading}>
        {loading ? 'Searching...' : 'Search Recipe'}
      </button>

      {error && <p>{error}</p>}

      {recipeData && (
        <div>
          <h2>{recipeData.title}</h2>
          <img src={recipeData.image} alt={recipeData.title} />
          <p><strong>Ingredients:</strong></p>
          <ul>
            {recipeData.ingredients && recipeData.ingredients.map((ingredient, index) => (
              // Try accessing multiple fields to find the correct one
              <li key={index}>
                {ingredient.originalString || ingredient.name || `${ingredient.amount} ${ingredient.unit}`}
              </li>
            ))}
          </ul>
          <p><strong>Instructions:</strong></p>
          <div dangerouslySetInnerHTML={{ __html: recipeData.instructions }} />
        </div>
      )}
    </div>
  );
};

export default App;
