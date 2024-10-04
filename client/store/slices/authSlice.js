import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";

const initialState = {
  userDetails: null,
  loading: false,
  status: false,
  role: null,
};

export const login = createAsyncThunk("login", async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
    role,
  });
  return response.data;
});

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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
