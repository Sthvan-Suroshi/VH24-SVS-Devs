import mongoose from "mongoose";

const RequirementSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    donationType: {
      type: String,
      enum: ["food", "money", "both"],
      required: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
    }, // Total monetary requirement
    remainingAmount: {
      type: Number,
      default: 0,
    }, // Remaining monetary requirement, will be updated on donation receipt
    foodItems: [
      {
        itemName: {
          type: String,
        }, // Name of the food item
        totalQuantity: {
          type: Number,
        }, // Total required quantity
        remainingQuantity: {
          type: Number,
        }, // Remaining quantity, will be updated on donation receipt
      },
    ],
  },
  { timestamps: true },
);

export const Requirement = mongoose.model("Requirement", RequirementSchema);
