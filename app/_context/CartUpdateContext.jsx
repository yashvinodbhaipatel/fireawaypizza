import React, { createContext, useContext, useState } from 'react';

export const CartUpdateContext = createContext(null);

export const useCartUpdateContext = () => {
  const context = useContext(CartUpdateContext);
  if (!context) {
    throw new Error('useCartUpdateContext must be used within a CartUpdateProvider');
  }
  return context;
};

export const CartUpdateProvider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
      {children}
    </CartUpdateContext.Provider>
  );
};
