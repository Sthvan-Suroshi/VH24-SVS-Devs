import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    donationType: { type: String, enum: ["food", "money"], required: true },
    amount: { type: Number },
    items: [{ type: String }],
    donationDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "alloted", "delivered"],
      default: "pending",
    },
    feedbackFromInstitution: {
      feedback: { type: String },
      rating: { type: Number, min: 1, max: 5 },
    },
  },
  { timestamps: true },
);

export const Donation = mongoose.model("Donation", DonationSchema);
