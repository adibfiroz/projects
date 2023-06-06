import mongoose from "mongoose";

const SoftwareSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    address: {
      type: String,
    },
    whatIs: {
      type: String,
    },
    website: {
      type: String,
    },
    photos: {
      type: [String],
    },
    price: {
      type: Number,
    },
    sofwareLogo: {
      type: String,
    },
    catName: {
      type: String,
      required: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Software", SoftwareSchema);
