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
    role: {
      type: String,
      default: "donor",
      immutable: true,
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

DonorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

export const Donor = mongoose.model("Donor", DonorSchema);
