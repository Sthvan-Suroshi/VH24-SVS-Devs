import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Institution } from '../models/institution.model.js';


export const instituteRequest = asyncHandler(async (req, res) => {
    // const institutionId = req.user._id; // Assuming the institution is authenticated
    // console.log(institutionId);
    const { totalAmount, remainingAmount, foodItems,institutionId } = req.body;

    if (!totalAmount && !foodItems) {
        throw new ApiError(400,'Requirements must include totalAmount or foodItems.');
    }

    const institution = await Institution.findById(institutionId);

    if (!institution) {
        throw new ApiError(404,'Institution not found.');
    }

    // If it's a monetary request
    if (totalAmount) {
        institution.requirements.totalAmount = totalAmount;
        institution.requirements.remainingAmount = remainingAmount || totalAmount;
    }

    // If it's a food request
    if (foodItems && foodItems.length > 0) {
        foodItems.forEach(item => {
            // const existingItem = institution.requirements.foodItems.find(
            //     (foodItem) => foodItem.itemName === item.itemName
            // );

        //     if (existingItem) {
        //         // Update existing food item quantities
        //         existingItem.totalQuantity = item.totalQuantity;
        //         existingItem.remainingQuantity = item.remainingQuantity || item.totalQuantity;
        //     } else {
                // Add new food items
                institution.requirements.foodItems.push({
                    itemName: item.itemName,
                    totalQuantity: item.totalQuantity,
                    remainingQuantity: item.remainingQuantity || item.totalQuantity,
                });
            
        });
    }

    // Save the updated institution requirements
    await institution.save();
    
    // res.status(200).json({
    //     message: 'Requirements successfully updated.',
    //     requirements: institution.requirements,
    // });

    return res
    .status(200)
    .json(
      new ApiResponse(200,institutionId, "Requirements Posted successfully ")
    );
});
