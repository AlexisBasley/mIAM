import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookingTime: number;
  calories: number;
  difficulty: 'easy' | 'medium' | 'hard';
  nutritionScore: 'A' | 'B' | 'C' | 'D' | 'E';
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

interface RecipesState {
  allRecipes: Recipe[];
  favoriteRecipes: string[];
  swipedRecipes: {
    liked: string[];
    disliked: string[];
  };
  currentRecipe: Recipe | null;
  loading: boolean;
}

const initialState: RecipesState = {
  allRecipes: [],
  favoriteRecipes: [],
  swipedRecipes: {
    liked: [],
    disliked: [],
  },
  currentRecipe: null,
  loading: false,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.allRecipes = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favoriteRecipes.includes(action.payload)) {
        state.favoriteRecipes.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(id => id !== action.payload);
    },
    swipeRecipe: (state, action: PayloadAction<{ id: string; liked: boolean }>) => {
      if (action.payload.liked) {
        state.swipedRecipes.liked.push(action.payload.id);
      } else {
        state.swipedRecipes.disliked.push(action.payload.id);
      }
    },
    setCurrentRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.currentRecipe = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setRecipes, 
  addToFavorites, 
  removeFromFavorites, 
  swipeRecipe, 
  setCurrentRecipe,
  setLoading 
} = recipesSlice.actions;

export default recipesSlice.reducer;