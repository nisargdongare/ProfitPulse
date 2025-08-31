import { configureStore } from '@reduxjs/toolkit';
// Import your slices here
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';
import commonReducer from './slices/commonSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
    user: userReducer,
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
