import { Donor } from "../models/donor.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Donor.findById(decodedToken?._id).select("-password ");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error has occured in auth middleware ");
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const isDonor = asyncHandler(async (req, _, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (req.user.role !== "donor") {
    throw new ApiError(401, "Unauthorized request to donor");
  }
  next();
});
