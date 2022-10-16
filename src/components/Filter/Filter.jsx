import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectContact } from 'redux/contacts/selectors';
import { setFilter } from 'redux/contacts/slice';
import s from './Filter.module.css';

export const FilterList = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const contacts = useSelector(selectContact);
    const dispatch = useDispatch();

    const onFilterChange = e => {
        const value = e.target.value.trim();

        dispatch(setFilter(value));
        setQueryParams(value === '' ? {} : { query: value });
    };

    if (contacts.length === 0) {
        return;
    };

    return (
        <label className='label'>
            <span className={s.label}>Find contacts by name</span>
            <input
                className={s.input}
                onChange={onFilterChange}
                type="text"
                value={queryParams.value}
                name="filter"
                placeholder="Start typing the name..."
            />
        </label>
    );
};
