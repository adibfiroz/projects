import Reviews from "../models/Reviews.js";
import Software from "../models/Software.js";
import Users from "../models/Users.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  // if (req.params.id === req.user.id) {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
  // } else {
  //   return next(createError(403, "You can update only your account!"));
  // }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has been deleted Successfully!");
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const saveSoftware = async (req, res, next) => {
  try {
    await Software.findByIdAndUpdate(req.params.id);
    await Users.findByIdAndUpdate(req.body.userId, {
      $push: { savedSoftwares: req.params.id },
    });
    res.status(200).json("Saved successfully");
  } catch (err) {
    next(err);
  }
};

export const removeSoftware = async (req, res, next) => {
  try {
    await Software.findByIdAndUpdate(req.params.id);
    await Users.findByIdAndUpdate(req.body.userId, {
      $pull: { savedSoftwares: req.params.id },
    });
    res.status(200).json("Removed successfully");
  } catch (err) {
    next(err);
  }
};

export const likeReview = async (req, res, next) => {
  try {
    await Users.findByIdAndUpdate(req.body.userId);
    await Reviews.findByIdAndUpdate(req.params.id, {
      $push: { likes: req.body.userId },
    });
    res.status(200).json("liked!");
  } catch (err) {
    next(err);
  }
};

export const unlikeReview = async (req, res, next) => {
  try {
    await Users.findByIdAndUpdate(req.body.userId);
    await Reviews.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.body.userId },
    });
    res.status(200).json("unliked!");
  } catch (err) {
    next(err);
  }
};

export const getAllreview = async (req, res, next) => {
  const userId = req.params.id;
  try {
    let review;
    if (userId) {
      review = await Reviews.find({ userId });
    } else {
      review = await Reviews.find();
    }
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

export const getAllSoftwares = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    const listSoftware = await Promise.all(
      user.savedSoftwares.map((software) => {
        return Software.findById(software);
      })
    );
    res.status(200).json(listSoftware);
  } catch (err) {
    next(err);
  }
};
