import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styles from './CartIcon.module.css';
import cartImage from '../media/cart_icon.svg';

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className={styles.cartContainer}>
      <Link to="/cart">
        <img src={cartImage} alt="Cart" className={styles.cartImage} />
        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
      </Link>
    </div>
  );
};

export default CartIcon;
