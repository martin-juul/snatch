import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferencesSlice {
  language: string;
}

const initialState: UserPreferencesSlice = {
  language: 'en',
};

const userPreferences = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

const {
  changeLanguage,
} = userPreferences.actions;

export const actions = {
  changeLanguage,
};

export const namespace = userPreferences.name;

export const reducer = userPreferences.reducer;
