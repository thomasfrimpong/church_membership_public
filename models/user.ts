import mongoose, { Schema } from "mongoose";
import Church from "./church";

const user_type = ["super_admin", "admin"];
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    type_of_admin: {
      type: String,
      enum: user_type,
    },
    active: {
      type: Boolean,
      default: true,
    },
    church_id: { type: Schema.Types.ObjectId, ref: Church },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
