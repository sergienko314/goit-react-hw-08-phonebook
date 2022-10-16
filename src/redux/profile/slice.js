import { createSlice } from '@reduxjs/toolkit';
import { getProfileThunk } from './operations';
import { loginThunk } from '../auth/operations';

const profileInitialState = {
  data: null,
  status: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,

  extraReducers: {
    [getProfileThunk.pending]: state => {
      state.status = true;
    },
    [getProfileThunk.fulfilled]: (state, { payload }) => {
      state.status = true;
      state.data = payload;
    },
    [getProfileThunk.rejected]: state => {
      state.status = false;
    },
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.status = true;
      state.data = payload.user;
    },
  },
});

export const profileReducer = profileSlice.reducer;
