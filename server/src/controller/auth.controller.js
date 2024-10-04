import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Donor } from "../models/donor.models.js";
import { Institution } from "../models/institution.model.js";
import { Shopkeeper } from "../models/shopkeeper.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Please provide email, password, and role");
  }

  // Defining a map for models based on role
  const models = {
    donor: Donor,
    institution: Institution,
    shopkeeper: Shopkeeper,
  };

  const Model = models[role]; // Get model based on user role
  if (!Model) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await Model.findOne({ email });
  if (!user) {
    throw new ApiError(
      404,
      `${role.charAt(0).toUpperCase() + role.slice(1)} not found`,
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const accessToken = jwt.sign(
    { _id: user._id, role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        token: accessToken,
      }),
    );
});

export const donorSignup = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || !password || !address) {
    throw new ApiError(
      400,
      "Please provide name, email, password, and address",
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Donor.create({
    name,
    email,
    password: hashedPassword,
    address,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Donor created successfully", user));
});

export const shopkeeperSignup = asyncHandler(async (req, res) => {
  const { name, shopName, email, password, address } = req.body;

  if (!name || !shopName || !email || !password || !address) {
    throw new ApiError(
      400,
      "Please provide all required fields: name, shop name, email, password, and address",
    );
  }

  const existingShopkeeper = await Shopkeeper.findOne({ email });

  if (existingShopkeeper) {
    throw new ApiError(400, "Shopkeeper with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newShopkeeper = await Shopkeeper.create({
    name,
    shopName,
    email,
    password: hashedPassword,
    address,
  });

  if (!newShopkeeper) {
    throw new ApiError(400, "Failed to create shopkeeper");
  }

  return res.status(201).json(
    new ApiResponse(201, "Shopkeeper registered successfully", {
      shopkeeper: {
        id: newShopkeeper._id,
        name: newShopkeeper.name,
        email: newShopkeeper.email,
        role: "shopkeeper",
      },
    }),
  );
});

export const institutionSignup = asyncHandler(async (req, res) => {
  const { name, email, password, address, contactInfo } = req.body;

  if (!name || !email || !password || !address || !contactInfo) {
    throw new ApiError(
      400,
      "Please provide all required fields: name, email, password, address, contact info, and requirements",
    );
  }

  const existingInstitution = await Institution.findOne({ email });

  if (existingInstitution) {
    throw new ApiError(400, "Institution with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newInstitution = await Institution.create({
    name,
    email,
    password: hashedPassword,
    address,
    contactInfo,
  });

  return res.status(201).json(
    new ApiResponse(201, "Institution registered successfully", {
      institution: {
        id: newInstitution._id,
        name: newInstitution.name,
        email: newInstitution.email,
        role: "institution",
      },
    }),
  );
});
