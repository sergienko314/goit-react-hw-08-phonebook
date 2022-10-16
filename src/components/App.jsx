import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfileThunk } from 'redux/profile/operations';
import { selectAuth } from 'redux/auth/selectors';
import { token as tokenUrl } from 'services/usersApi';
import Layout from './Layout';
import LoginPage from '../pages/LoginPage';
import Registration from '../pages/Registration';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const HomePage = lazy(() => import('pages/HomePage'));
const ContactPage = lazy(() => import('pages/ContactPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { token, status } = useSelector(selectAuth);

  if (!token) {
    tokenUrl.set(token);
  }

  useEffect(() => {
    if (status) {
      dispatch(getProfileThunk());
    }
  }, [dispatch, status]);

  return (
    <BrowserRouter basename="/goit-react-hw-08-phonebook">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/contacts" element={<ContactPage />} />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registration />} />
          </Route>
        </Route>
        <Route path="*" element={<Layout />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

