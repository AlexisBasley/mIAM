import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  diet: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
  allergies: string[];
  budget: number;
  healthGoals: string;
  householdSize: number;
  cookingTime: number;
}

interface UserState {
  isAuthenticated: boolean;
  profile: {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState['profile']>) => {
      state.isAuthenticated = true;
      state.profile = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.profile) {
        state.profile.preferences = { ...state.profile.preferences, ...action.payload };
      }
    },
  },
});

export const { login, logout, updatePreferences } = userSlice.actions;
export default userSlice.reducer;