import { Provider } from "./routes/routes";
import "./App.css";
import { Suspense, useLayoutEffect } from "react";
import { auth } from "./firebase";
import { useAppDispatch, useAppSelector } from "./store";
import { removeCredentials, setCredentials, setCredentialsLoading } from "./store/slices/authSlice";
import { FullScreenLoader } from "./components/FullScreenLoader/FullScreenLoader";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useLayoutEffect(() => {
    dispatch(setCredentialsLoading(void 0));
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setCredentials({
            email: user.email,
            accessToken: user.accessToken,
            id: user.uid,
          })
        );
      } else {
        dispatch(removeCredentials());
      }
    });
  }, []);

  if (isLoading) return <FullScreenLoader />;
  return (
    <Suspense fallback={<></>}>
      <Provider />
    </Suspense>
  );
}

export default App;
