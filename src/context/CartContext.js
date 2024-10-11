import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalAmount, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
