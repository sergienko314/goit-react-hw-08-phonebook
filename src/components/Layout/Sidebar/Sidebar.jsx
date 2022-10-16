import { useSelector } from 'react-redux';
import Login from './Login';
import Navigation from './Nav';
import s from './Sidebar.module.css'

const Sidebar = () => {
  const isLoggedIn = useSelector(state => state.auth.status);
  return (
    <div className={s.wrapper}>
      <div>{isLoggedIn ? <Navigation /> : <Login />}</div>
    </div>
  );
};

export default Sidebar;
