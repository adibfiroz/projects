import Reviews from "../models/Reviews.js";
import Software from "../models/Software.js";
import { createError } from "../utils/error.js";

export const addReview = async (req, res, next) => {
  const newReview = new Reviews({ ...req.body });
  //userId: req.user.id
  try {
    // const review = await Reviews.findOne({
    //   softId: req.body.softId,
    //   userId: req.user.id,
    // });

    // if (review)
    //   return next(
    //     createError(403, "You have already created review for this Software!")
    //   );

    const saveReview = await newReview.save();

    await Software.findByIdAndUpdate(req.body.softId, {
      $inc: { totalStars: req.body.rating, starNumber: 1 },
    });

    res.status(200).send(saveReview);
  } catch (err) {
    next(err);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const reviews = await Reviews.find({ softId: req.params.softId }).sort({
      createdAt: -1,
    });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const getAllReview = async (req, res, next) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).send("Review Has been deleted Successfully!");
  } catch (err) {
    next(err);
  }
};
