import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
const LogoutButton = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="rounded-full inline-block px-6 py-2 duration-200 hover:bg-blue-200" onClick={logoutHandler}>
      Logout
    </button>
  );
};

export default LogoutButton;
