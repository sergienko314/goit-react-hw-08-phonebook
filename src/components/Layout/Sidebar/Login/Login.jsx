import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import s from '../Login/Login.module.css';

const Login = () => {
  const getActiveClassName = ({ isActive }) => {
    return isActive ? `${s.item} ${s.active}` : s.item;
  };

  return (
    <>
      <div className={s.wrapper}>
          <NavLink end className={getActiveClassName} to="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </NavLink>

        <div className={s.login}>
          <NavLink to="/login" className={getActiveClassName}>
            Login
          </NavLink>
          <NavLink to="/register" className={getActiveClassName}>
            Registration
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
