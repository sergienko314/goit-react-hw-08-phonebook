import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from '../../services/usersApi';
import { selectAuth } from 'redux/auth/selectors';
import { getUserService } from '../../services/usersApi';

export const getProfileThunk = createAsyncThunk(
  '/users/current',
  async (_, thunkAPI) => {
    const auth = selectAuth(thunkAPI.getState());

    try {
      if (!auth.token) {
        return thunkAPI.rejectWithValue();
      }
      token.set(auth.token);
      return await getUserService();
    } catch {
      token.unset();
      return thunkAPI.rejectWithValue();
    }
  }
);
