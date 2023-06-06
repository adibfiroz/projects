import Categories from "../models/Categories.js";
import Software from "../models/Software.js";

export const createSoftware = async (req, res, next) => {
  const newSoftware = new Software(req.body);

  try {
    const savedSoftware = await newSoftware.save();
    res.status(200).json(savedSoftware);
  } catch (err) {
    next(err);
  }
};

export const getAllSoftwares = async (req, res, next) => {
  try {
    const software = await Software.find(req.query).limit(req.query.limit);
    res.status(200).json(software);
  } catch (err) {
    next(err);
  }
};

export const getAllSoftwareOfCat = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.catName && { catName: q.catName }),
    ...(q.popular && { popular: q.popular }),
  };
  try {
    const software = await Software.find(filters).sort({ [q.sort]: -1 });

    res.status(200).send(software);
  } catch (err) {
    next(err);
  }
};

export const getSoftwares = async (req, res, next) => {
  try {
    const software = await Software.findById(req.params.id);
    res.status(200).json(software);
  } catch (err) {
    next(err);
  }
};

export const deleteSoftware = async (req, res, next) => {
  try {
    await Software.findByIdAndDelete(req.params.id);
    res.status(200).json("Software has been deleted Successfully!");
  } catch (err) {
    next(err);
  }
};

export const getCatofSoft = async (req, res, next) => {
  try {
    const soft = await Software.findById(req.params.id);
    const getCat = await Promise.all(
      soft.catID.map((category) => {
        return Categories.findById(category);
      })
    );
    res.status(200).json(getCat);
  } catch (err) {
    next(err);
  }
};
