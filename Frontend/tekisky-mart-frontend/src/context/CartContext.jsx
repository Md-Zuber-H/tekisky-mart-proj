import { createContext, useContext, useState } from "react";
import * as cartService from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  // get cart from backend
  const fetchCart = async () => {
    const data = await cartService.getCart();
    setCart(data);
  };

  // add item to cart
  const addToCart = async (product) => {
    await cartService.addToCart(product._id, 1);
    fetchCart(); // refresh cart
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ custom hook (IMPORTANT)
export const useCart = () => {
  return useContext(CartContext);
};
