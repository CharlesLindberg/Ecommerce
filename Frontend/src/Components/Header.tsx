import { NavLink, Outlet } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      {" "}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/images/Logo-old-school.webp" alt="Butikens logotyp" />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Home{" "}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cart
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
