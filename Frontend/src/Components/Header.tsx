import { NavLink, Outlet } from "react-router-dom";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const hasItems = cartItems.length > 0;

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
                <FontAwesomeIcon
                  icon={hasItems ? faCartArrowDown : faShoppingCart}
                  size="2x"
                />
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
