import React from 'react';
import NameToRecipe from './components/NameToRecipe';
import IngredientsToRecipe from './components/IngredientsToRecipe';
import BMICalculator from './components/BMICalculator';

const App = () => {
  return (
    <div className="App">
      <h1>Recipe and Health Generator</h1>
      <NameToRecipe />
      <IngredientsToRecipe />
      <BMICalculator />
    </div>
  );
};

export default App;
