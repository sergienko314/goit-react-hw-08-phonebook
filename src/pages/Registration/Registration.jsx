import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { omit } from "lodash";
import { toast } from "react-toastify";
import { createUserService } from "services/usersApi";
import { loginThunk } from "redux/auth/operations";
import Loader from "components/Loader";
import s from './Registration.module.css';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        email: '',
        password: '',
    };

    const [user, setUser] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeUser = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        
        createUserService(user).then(() => {
            toast.success("Success");
            setIsLoading(false);
            dispatch(loginThunk(omit(user, 'name'))).unwrap();
            setUser(initialValue);
        }).then(() => navigate('/', {replace: true}))
            .catch(() => toast.error('Warning! Something went wrong ;('));
    };

    return (
        <main className={s.wrapper}>
            {isLoading && <Loader />}
            <form className={s.form} onSubmit={onSubmit}>
                <label>
                    <span className={s.label}>Name</span>
                    <input
                        className={s.input}
                        type="text"
                        name="name"
                        value={user.name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        placeholder="John Smith"
                        onChange={onChangeUser} />
                </label>
                <label>
                    <span className={s.label}>Email</span>
                    <input className={s.input} type="email" name="email" value={user.email} required placeholder="my@mail.com" onChange={onChangeUser} />
                </label>
                <label>
                    <span className={s.label}>Password</span>
                    <input className={s.input} type="password" name="password" value={user.password} minLength="7" required placeholder="********" onChange={onChangeUser} />
                </label>
                <Link className={s.link} to="/login">Already have account?</Link>
                <button className={s.btn} type="submit">
                    <span>Register</span>
                </button>
            </form>
        </main>
    );
};

export default Registration;
