import mongoose, { Schema } from "mongoose";
const churchSchema = new Schema(
  {
    church_name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone_number: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
    brand_colour_1: {
      type: String,
      required: true,
    },
    brand_colour_2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Church = mongoose.models.Church || mongoose.model("Church", churchSchema);
export default Church;
