import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  reqInstitutionData: null,
};

export const createRequestForDonation = createAsyncThunk(
  "createRequestForDonation",
  async (data) => {
    console.log(data);
    const response = await axiosInstance.post(
      "/institution/institute-request",
      data
    );
    return response.data;
  }
);

export const getInstitutionsRequestingDonations = createAsyncThunk(
  "getInstitutionsRequestingDonations",
  async () => {
    const response = await axiosInstance.get("/institution/get-institution");
    return response.data;
  }
);

export const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequestForDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRequestForDonation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRequestForDonation.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getInstitutionsRequestingDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getInstitutionsRequestingDonations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.reqInstitutionData = action.payload;
        }
      )
      .addCase(getInstitutionsRequestingDonations.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default institutionSlice.reducer;
