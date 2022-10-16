import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { addContact, updateContact } from 'redux/contacts/operations';
import { toast } from 'react-toastify';
import { selectContact, selectEdit } from 'redux/contacts/selectors';
import Button from '@mui/material/Button';
import s from './Form.module.css';

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContact);
  const dispatch = useDispatch();
  const editContact = useSelector(selectEdit)
    
    useEffect(() => {
        if(editContact){ setName(editContact.name)
        setNumber(editContact.number)}
       
    }, [editContact])
  
  
  const onInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log(value + "is not a valid value");
    }
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const hasUserContacts = contacts.some(user => user.name === name);
    
    if (hasUserContacts) {
      toast.warning(`${name} is already in contacts!`);
      return;
    };

     editContact ? dispatch(updateContact({...{name, number}, id:editContact.id})) : dispatch(addContact({name, number}));
    formReset();
  };

  return (
    <form className={s.form} onSubmit={onFormSubmit}>
      <label>
        <span className={s.label}>Name</span>
        <input
          className={s.input}
          onChange={onInputChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter new name..."
          required
        />
      </label>
      <label>
        <span className={s.label}>Number</span>
        <input
          className={s.input}
          onChange={onInputChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter phone number..."
          required
        />
      </label>
      <Button
          className={s.btn}
          disabled={!name || !number}
          variant="contained"
          type="submit"
        >
          <span>Save</span>
        </Button>
    </form>
  );
};
