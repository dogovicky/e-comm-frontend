import { createContext, useContext, useReducer } from "react";
import { initialState } from "../reducer/cartReducer";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook to use Cart Context
export const useCart = () => useContext(CartContext);
