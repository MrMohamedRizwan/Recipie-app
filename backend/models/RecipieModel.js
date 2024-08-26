const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    image: { type: String ,default:"https://images.indianexpress.com/2023/12/food.jpg?w=640"},
    category:{ type: String }
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;