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
    contactInfo: [
      {
        type: String,
        required: true,
      },
    ],
    donationsReceived: [
      {
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" }, // Reference to Donor
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }, // Reference to Shop
        donationType: { type: String, enum: ["food", "money"], required: true },
        amount: { type: Number }, // Amount if donation is money
        items: [{ type: String }], // Items if donation is food
        deliveryStatus: {
          type: String,
          enum: ["pending", "alloted", "received"],
          default: "pending",
        },
        receivedDate: { type: Date },
      },
    ],
    feedbackToShop: [
      {
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }, // Reference to Shop
        feedback: { type: String },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    requirements: {
      totalAmount: { type: Number, required: true }, // Total monetary requirement
      remainingAmount: { type: Number, required: true }, // Remaining monetary requirement
      foodItems: [
        {
          itemName: { type: String, required: true }, // Name of the food item
          totalQuantity: { type: Number, required: true }, // Total required quantity
          remainingQuantity: { type: Number, required: true }, // Remaining quantity
        },
      ],
    },
    notifications: [
      {
        message: { type: String },
        read: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

// Method to reduce monetary requirements
InstitutionSchema.methods.reduceMonetaryRequirements = function (donationAmount) {
  if (this.requirements.remainingAmount >= donationAmount) {
    this.requirements.remainingAmount -= donationAmount;
  } else {
    throw new Error("Donation exceeds remaining monetary requirements.");
  }
};

// Method to reduce food item requirements
InstitutionSchema.methods.reduceFoodItemRequirements = function (itemName, quantity) {
  const foodItem = this.requirements.foodItems.find(item => item.itemName === itemName);
  if (foodItem) {
    if (foodItem.remainingQuantity >= quantity) {
      foodItem.remainingQuantity -= quantity;
    } else {
      throw new Error(`Donation exceeds remaining quantity for ${itemName}.`);
    }
  } else {
    throw new Error(`Food item ${itemName} not found in requirements.`);
  }
};

export const Institution = mongoose.model("Institution", InstitutionSchema);
