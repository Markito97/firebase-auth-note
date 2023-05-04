import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export const Layout = () => {
  return (
    <div className="container">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
