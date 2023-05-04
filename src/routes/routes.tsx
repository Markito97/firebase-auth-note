import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Welcome } from "../pages/Welcome";
import { useAppSelector } from "../store";
import { Posts } from "../pages/Posts";

enum ROUTES {
  MAIN = "/",
}

const routes = (isAuth: string | null) => {
  return [
    {
      path: ROUTES.MAIN,
      element: <Layout />,
      children: [{ index: true, element: isAuth ? <Posts /> : <Welcome /> }],
    },
  ];
};

export const Provider = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const router = createHashRouter(routes(accessToken));

  return <RouterProvider router={router} />;
};
