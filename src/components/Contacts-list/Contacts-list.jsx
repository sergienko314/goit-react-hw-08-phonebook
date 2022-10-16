import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchContacts, deleteContact } from 'redux/contacts/operations';
import { selectContact } from 'redux/contacts/selectors';
import { selectAuth } from 'redux/auth/selectors';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './Contacts-list.module.css';
import { editeNewContact } from 'redux/contacts/slice';
import { AccountBox, Create } from '@mui/icons-material';

export const ContactsList = () => {
  const contacts = useSelector(selectContact);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const status = useSelector(selectAuth);

  const filteredContacts = useMemo(() => {
    return contacts.length
      ? contacts.filter(({ name }) => {
          return name.toLowerCase().includes(filter.toLowerCase());
        })
      : [];
  }, [contacts, filter]);

  useEffect(() => {
    if (status) {
      dispatch(fetchContacts());
    }
  }, [dispatch, status]);

  const elements = filteredContacts.map(({ id, name, number }) => (
    <li className={s.item} key={id}>
      <p className={s.text}>
        <AccountBox sx={{ fontSize: 20, marginRight: 1 }} />
        {name}
      </p>
      <p className={s.tel}>Tel: {number}</p>
      <Button
        className={s.btnDel}
        variant="contained"
        startIcon={<DeleteIcon />}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </Button>
      <Button
        className={s.btnEd}
        startIcon={<Create />}
        variant="contained"
        type="button"
        onClick={() => dispatch(editeNewContact({ id, name, number }))}
      >
        Edit
      </Button>
    </li>
  ));

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>{elements}</ul>
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onDelete: PropTypes.func,
};
