import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meal {
  recipeId: string;
  type: 'lunch' | 'dinner';
}

interface DayPlan {
  date: string;
  meals: Meal[];
}

interface CalendarState {
  weekPlan: DayPlan[];
  nutritionScore: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  shoppingList: {
    items: string[];
    generatedAt: string | null;
  };
}

const initialState: CalendarState = {
  weekPlan: [],
  nutritionScore: null,
  shoppingList: {
    items: [],
    generatedAt: null,
  },
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setWeekPlan: (state, action: PayloadAction<DayPlan[]>) => {
      state.weekPlan = action.payload;
    },
    addMeal: (state, action: PayloadAction<{ date: string; meal: Meal }>) => {
      const dayIndex = state.weekPlan.findIndex(day => day.date === action.payload.date);
      if (dayIndex >= 0) {
        state.weekPlan[dayIndex].meals.push(action.payload.meal);
      } else {
        state.weekPlan.push({
          date: action.payload.date,
          meals: [action.payload.meal],
        });
      }
    },
    removeMeal: (state, action: PayloadAction<{ date: string; recipeId: string }>) => {
      const dayIndex = state.weekPlan.findIndex(day => day.date === action.payload.date);
      if (dayIndex >= 0) {
        state.weekPlan[dayIndex].meals = state.weekPlan[dayIndex].meals.filter(
          meal => meal.recipeId !== action.payload.recipeId
        );
      }
    },
    setNutritionScore: (state, action: PayloadAction<CalendarState['nutritionScore']>) => {
      state.nutritionScore = action.payload;
    },
    generateShoppingList: (state, action: PayloadAction<string[]>) => {
      state.shoppingList = {
        items: action.payload,
        generatedAt: new Date().toISOString(),
      };
    },
  },
});

export const { 
  setWeekPlan, 
  addMeal, 
  removeMeal, 
  setNutritionScore, 
  generateShoppingList 
} = calendarSlice.actions;

export default calendarSlice.reducer;