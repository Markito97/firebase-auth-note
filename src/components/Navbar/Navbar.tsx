import { signInWithPopup, signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import "./Navbar.css";
import {
  removeCredentials,
  setCredentials,
  setCredentialsLoading,
} from "../../store/slices/authSlice";
import { auth, provider } from "../../firebase";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  const hanldeAuth = async (): Promise<void> => {
    try {
      dispatch(setCredentialsLoading());
      const credentials = await signInWithPopup(auth, provider);
      void dispatch(
        setCredentials({
          email: credentials.user.email,
          accessToken: credentials.user.accessToken,
          id: credentials.user.uid,
        })
      );
    } catch (error) {
      throw new Error("Unathorize error");
    }
  };

  const handleLogut = (): void => {
    try {
      void signOut(auth);
      void dispatch(removeCredentials());
    } catch (error) {}
  };

  return (
    <div className="navbar">
      <div className="logo">MS-Note</div>
      <button className="login__btn btn" onClick={accessToken ? handleLogut : hanldeAuth}>
        {accessToken ? "Logout" : "Login"}
      </button>
    </div>
  );
};
