import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from '../../services/usersApi';
import { loginUserService } from 'services/usersApi';

export const loginThunk = createAsyncThunk('auth/login', async body => {
  const data = await loginUserService(body);
  token.set(data.token);
  return data;
});
