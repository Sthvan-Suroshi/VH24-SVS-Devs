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
        institutionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Institution",
        }, // Reference to Institution
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }, // Reference to Shop
        donationType: { type: String, enum: ["food", "money"], required: true },
        amount: { type: Number }, // Amount if donation is money
        items: [{ type: String }], // Items if donation is food
        donationDate: { type: Date, default: Date.now },
        status: {
          type: String, 
          enum: ["pending", "shipped", "delivered"],
          default: "pending",
        }, // Status of donation
      },
    ],
    notifications: [
      {
        message: { type: String },
        read: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },
      },
    ],
    feedbackFromInstitution: [
      {
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }, // Reference to the Shop
        institutionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Institution",
        }, // Reference to Institution
        feedback: { type: String },
        rating: { type: Number, min: 1, max: 5 }, // Rating about shopkeeper
      },
    ],
  },
  { timestamps: true },
);

export default Donor = mongoose.model("Donor", DonorSchema);
