import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "redux/auth/selectors";

const PrivateRoute = () => {
    const { token } = useSelector(selectAuth);

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
