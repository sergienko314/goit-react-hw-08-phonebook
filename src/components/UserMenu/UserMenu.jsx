import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { token } from "services/usersApi";
import { logoutAction } from "redux/auth/slice";
import UserProfile from "./UserProfile";
import s from './UserProfile/User.module.css'

const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogOut = () => {
        dispatch(logoutAction());
        token.unset();
        navigate('/', { replace: true });
    };

    return (
        <div className={s.wrapper}>
            <UserProfile />
            <button className={s.btn} type="button" onClick={onLogOut}>
                <span>Logout</span>
            </button>
        </div>
    );
};

export default UserMenu;
