import { Donor } from "../models/donor.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Institution } from "../models/institution.model.js";

// export const verifyJWT = asyncHandler(async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     console.log(token);

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log(decodedToken);

//     const user = await Donor.findById(decodedToken?._id).select("-password ");

//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error has occured in auth middleware ");
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// });

export const isDonor = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);

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

export const isInstitution = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);

    const user = await Institution.findById(decodedToken?._id).select(
      "-password ",
    );

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
