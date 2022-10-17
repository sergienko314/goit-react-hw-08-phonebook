import { privateApi } from './usersApi';

export const fetchContactsApi = async () => {
  const response = await privateApi.get('/contacts');
  return response;
};

export const postContactApi = async item => {
  const response = await privateApi.post('/contacts', item);
  return response;
};

export const deleteContactApi = async id => {
  const response = await privateApi.delete(`/contacts/${id}`);
  return response;
};

export const updateContactsApi = async data => {
  return privateApi.patch(`/contacts/${data.id}`, {
    name: data.name,
    number: data.number,
  });
};
