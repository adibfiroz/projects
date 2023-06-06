import Categories from "../models/Categories.js";

export const createCategory = async (req, res, next) => {
  const newCategory = new Categories(req.body);
  try {
    const saveCat = await newCategory.save();
    res.status(200).json(saveCat);
  } catch (err) {
    next(err);
  }
};

export const getAllcat = async (req, res, next) => {
  try {
    const allCat = await Categories.find(req.query).limit(req.query.limit);
    res.status(200).json(allCat);
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const Category = await Categories.findById(req.params.id);
    res.status(200).json(Category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json("Category Has been deleted Successfully!");
  } catch (err) {
    next(err);
  }
};
