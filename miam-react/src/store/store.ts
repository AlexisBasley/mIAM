import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import recipesReducer from './slices/recipesSlice';
import calendarReducer from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;