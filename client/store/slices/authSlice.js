import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";

const initialState = {
  userDetails: null,
  loading: false,
  status: false,
  role: null,
};

export const login = createAsyncThunk(
  "login",
  async ({ email, password, role }) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
      role,
    });
    return response.data;
  }
);

export const donorSignup = createAsyncThunk(
  "donnorSignup",
  async ({ name, email, password, address }) => {
    const response = await axiosInstance.post("/auth/donor-signup", {
      name,
      email,
      password,
      address,
    });
    return response.data;
  }
);

export const shopkeeperSignup = createAsyncThunk(
  "shopkeeperSignup",
  async ({
    name,
    shopName,
    email,
    password,
    city,
    state,
    district,
    pincode,
  }) => {
    const response = await axiosInstance.post("/auth/shopkeeper-signup", {
      name,
      shopName,
      email,
      password,
      city,
      state,
      district,
      pincode,
    });
    return response.data;
  }
);

export const institutionSignup = createAsyncThunk(
  "institutionSignup",
  async ({
    name,
    email,
    password,
    city,
    state,
    district,
    pincode,
    contactInfo,
  }) => {
    const response = await axiosInstance.post("/auth/institution-signup", {
      name,
      email,
      password,
      city,
      state,
      district,
      pincode,
      contactInfo,
    });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.loading = false;
      state.status = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
        state.status = true;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(donorSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(donorSignup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(donorSignup.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(shopkeeperSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(shopkeeperSignup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(shopkeeperSignup.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
