import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Institution } from '../models/institution.model.js';

export const shopkeeperDonation = asyncHandler(async (req, res) => {
  const { institutionId, donationType, amount, foodItems } = req.body;
  console.log(institutionId)

  // Find the institution
//   const institution = await Institution.findById(institutionId);

    const institution = await Institution.findById(institutionId).populate("requirements")

  console.log(institution.requirements)
  if (!institution) {
    throw new ApiError(404, "Institution not found.");
  }
  
  // Handle monetary donations
  if (donationType === 'money') {
    console.log(institution.requirements.remainingAmount)
    if (institution.requirements.remainingAmount >= amount) {
      institution.requirements.remainingAmount -= amount;
    } else {
      throw new ApiError(400, "Donation exceeds remaining monetary requirements.");
    }
  }

  // Handle food item donations
  if (donationType === 'food' && foodItems && foodItems.length > 0) {
    foodItems.forEach((item) => {
      const existingItem = institution.requirements.foodItems.find(
        (foodItem) => foodItem.itemName === item.itemName
      );

      if (existingItem) {
        if (existingItem.remainingQuantity >= item.quantity) {
          existingItem.remainingQuantity -= item.quantity;
        } else {
          throw new ApiError(
            400,
            `Donation exceeds remaining quantity for ${item.itemName}.`
          );
        }
      } else {
        throw new ApiError(400, `Food item ${item.itemName} not found.`);
      }
    });
  }

  // Save the updated institution
  await institution.save();

  return res.status(200).json(new ApiResponse(200, institution, "Donation processed successfully."));
});
