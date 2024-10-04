import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    name: {
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
    donations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Donor = mongoose.model("Donor", DonorSchema);
