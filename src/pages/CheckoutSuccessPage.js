/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './CheckoutSuccessPage.module.css';

const CheckoutSuccessPage = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className={styles.successContainer}>
      <h1 className={styles.successTitle}>Thank you for your purchase!</h1>
      <p className={styles.successMessage}>Your order was successful.</p>
      <Link to="/">
        <button className={styles.returnButton}>Return to store</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;
