import mongoose, { Schema } from "mongoose";
import Church from "@/models/church";
const choice = ["visit", "stay"];
const memberSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    decision: {
      type: String,
      enum: choice,
    },
    invitee: {
      type: String,
      required: true,
    },
    church_id: { type: Schema.Types.ObjectId, ref: Church },
  },
  { timestamps: true }
);

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);
export default Member;
