import mongoose from "mongoose";

const ShopkeeperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shopName: {
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
    receivedDonations: [
      {
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        institutionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Institution",
        },
        donationType: { type: String, enum: ["food", "money"], required: true },
        amount: { type: Number },
        items: [{ type: String }],
        deliveryStatus: {
          type: String,
          enum: ["pending", "shipped", "delivered"],
          default: "pending",
        },
        deliveryDate: { type: Date },
      },
    ],
    feedbackFromInstitutions: [
      {
        institutionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Institution",
        },
        feedback: { type: String },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
  },
  { timestamps: true },
);

export const Shopkeeper = mongoose.model("Shopkeeper", ShopkeeperSchema);
