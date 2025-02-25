const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res, next) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      user: req.user.id,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'ERROR 500: Failed to create recipe' });
  }
};

exports.getRecipesPublic = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'ERROR 500: Failed to retrieve recipes' });
  }
};

exports.getRecipeByIdPublic = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'ERROR 404: Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'ERROR 500: Failed to retrieve recipe' });
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'ERROR 404: Recipe not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isCreator = recipe.user.toString() === req.user.id;

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ message: 'ERROR 403: Not authorized to update this recipe' });
    }

    const { title, ingredients, instructions } = req.body;
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    await recipe.save();

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'ERROR 500: Failed to update recipe' });
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'ERROR 404: Recipe not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isCreator = recipe.user.toString() === req.user.id;

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ message: 'ERROR 403: Not authorized to delete this recipe' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'ERROR 500: Failed to delete recipe' });
  }
};
