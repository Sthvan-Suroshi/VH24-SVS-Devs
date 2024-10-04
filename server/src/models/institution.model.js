import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema(
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
    address: {
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "institution",
      immutable: true,
    },
    contactInfo: [
      {
        type: String,
        required: true,
      },
    ],
    // Track donations received by the institution
    donationsReceived: [
      {
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" }, // Reference to Donor
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shopkeeper" }, // Reference to Shop
        donationType: { type: String, enum: ["food", "money", "both"] },
        amount: { type: Number }, // Amount if donation is money
        items: [{ itemName: { type: String }, quantity: { type: Number } }], // Items if donation is food
        deliveryStatus: {
          type: String,
          enum: ["pending", "alloted", "received"],
          default: "pending",
        },
        receivedDate: { type: Date },
      },
    ],
    // Feedback section for the shops
    feedbackToShop: [
      {
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shopkeeper" }, // Reference to Shop
        feedback: { type: String },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    // Reference to the Requirement schema to track requested donations
    requirements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Requirement",
      },
    ],
  },
  { timestamps: true },
);

export const Institution = mongoose.model("Institution", InstitutionSchema);
