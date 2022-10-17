import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './operations';

const contactsInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
  filter: '',
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    editeNewContact: (state, { payload }) => {
      state.editContact = payload;
    },
  },

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts = [...state.contacts, action.payload];
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts = state.contacts.filter(
        user => user.id !== action.payload.id
      );
    },
    [deleteContact.rejected]: handleRejected,
    [updateContact.pending]: handlePending,
    [updateContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.contacts = state.contacts.map(item =>
        item.id === payload.id ? payload : item
      );
    },
    [updateContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { setFilter, editeNewContact } = contactsSlice.actions;
