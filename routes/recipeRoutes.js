const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createRecipe,
  getRecipesPublic,
  getRecipeByIdPublic,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

// Create a new recipe (only authenticated users can create)
router.post('/', protect, createRecipe);

// Public: Retrieve all recipes (everyone can see)
router.get('/', getRecipesPublic);

// Public: Retrieve a specific recipe by its ID (everyone can see)
router.get('/:id', getRecipeByIdPublic);

// Update a specific recipe (only creator can update)
router.put('/:id', protect, updateRecipe);

// Delete a specific recipe (only creator can delete)
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
