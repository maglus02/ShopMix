import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { cartItems, totalAmount, updateItemQuantity } = useContext(CartContext);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Cart</h1>
      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <Link to={`/product/${item.id}`} className={styles.itemDetails}>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.itemPrice}>${item.discountedPrice}</p>
              </Link>
              <div className={styles.quantityContainer}>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                <span className={styles.itemQuantity}>{item.quantity}</span>
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <img className={styles.itemImg} alt={item.title} src={item.image.url} />
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <p className={styles.totalPrice}>Total: ${totalAmount}</p>
          <Link to="/checkout-success">
            <button className={styles.checkoutButton}>Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
