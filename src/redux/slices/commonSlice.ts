import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  serviceConnectionStatus: 'Not Connected' | 'Service Connected' | 'Service Not Connected';
  isLoading: boolean;
  lastUpdated: string | null;
}

const initialState: CommonState = {
  serviceConnectionStatus: 'Not Connected',
  isLoading: false,
  lastUpdated: null,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setServiceConnected: (state) => {
      state.serviceConnectionStatus = 'Service Connected';
      state.lastUpdated = new Date().toISOString();
    },
    setServiceNotConnected: (state) => {
      state.serviceConnectionStatus = 'Service Not Connected';
      state.lastUpdated = new Date().toISOString();
    },
    setServiceNotConnectedDefault: (state) => {
      state.serviceConnectionStatus = 'Not Connected';
      state.lastUpdated = new Date().toISOString();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setServiceConnected,
  setServiceNotConnected,
  setServiceNotConnectedDefault,
  setLoading
} = commonSlice.actions;

export default commonSlice.reducer;
