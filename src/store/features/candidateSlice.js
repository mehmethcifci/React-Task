import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateCandidate = {
  candidates: [],
};

export const fetchCandidates = createAsyncThunk(
  "candidate/fetchCandidates",
  async (payload) => {
    try {
      const result = await fetch(
        "http://localhost:8081/api/v1/candidate/findall",
        {
          method: "GET",
        }
      )
        .then((p) => p.json())
        .then(console.log(initialStateCandidate))
        .catch((err) => console.log(err));
      return result;
    } catch (error) {}
  }
);

const candidateSlice = createSlice({
  name: "candidate",
  initialState: initialStateCandidate,
  reducers: {
    setLogin: (state) => {
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (build) => {},
});

export const { setLogin, setLogout } = candidateSlice.actions;

export default candidateSlice.reducer;
