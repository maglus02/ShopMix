import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <div className={styles.logo}>
          <Link to="/">ShopMix</Link>
        </div>
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? `${styles.active}` : '')}>Home</NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => (isActive ? `${styles.active}` : '')}>Contact</NavLink>
        </nav>
        <CartIcon />
      </header>

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
