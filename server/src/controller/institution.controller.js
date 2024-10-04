import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Institution } from "../models/institution.model.js";
import { Requirement } from "../models/requirements.models.js";

export const createDonationRequest = asyncHandler(async (req, res) => {
  const { donationType, totalAmount, foodItems } = req.body;

  // Find the institution making the request
  const institutionId = req.user?._id;
  console.log(req.user?._id);

  const institution = await Institution.findById(institutionId);
  if (!institution) {
    return new ApiError(404, "Institution not found");
  }

  // Check if donationType is valid
  if (!["food", "money", "both"].includes(donationType)) {
    return new ApiError(400, "Invalid donation type");
  }

  // Prepare the requirement fields based on donation type
  const requirementData = {
    institutionId,
    donationType,
  };

  // If the request involves money, add totalAmount and remainingAmount
  if (donationType === "money" || donationType === "both") {
    if (!totalAmount || totalAmount <= 0) {
      return new ApiError(400, "Total amount must be greater than 0");
    }
    requirementData.totalAmount = totalAmount;
    requirementData.remainingAmount = totalAmount; // Initially the remaining is equal to total
  }

  // If the request involves food, add foodItems and their required quantities
  if (donationType === "food" || donationType === "both") {
    if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
      return new ApiError(400, "Please provide food items");
    }

    const formattedFoodItems = foodItems.map((item) => ({
      itemName: item.itemName,
      totalQuantity: item.totalQuantity,
      remainingQuantity: item.totalQuantity, // Initially the remaining is equal to total
    }));

    requirementData.foodItems = formattedFoodItems;
  }

  // Create a new requirement for the donation request
  const newRequirement = new Requirement(requirementData);
  await newRequirement.save();

  // Add the requirement reference to the institution's requirements array
  institution.requirements.push(newRequirement._id);
  await institution.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { newRequirement },
        "Donation request created successfully",
      ),
    );
});
