import axios from 'axios';

export const publicApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const privateApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const token = {
  set: value => {
    privateApi.defaults.headers.Authorization = value;
  },

  unset: () => {
    privateApi.defaults.headers.Authorization = null;
  },
};

export const createUserService = async body => {
  return publicApi.post('/users/signup', body);
};

export const loginUserService = async body => {
  const { data } = await publicApi.post('/users/login', body);
  return data;
};

export const getUserService = async body => {
  const { data } = await privateApi.get('/users/current', body);
  return data;
};
