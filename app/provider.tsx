"use client"
import React from "react";
import Header from './_components/Header'; // Adjust the path as necessary
import { Toaster } from "@/components/ui/sonner";
import { CartUpdateProvider } from './_context/CartUpdateContext';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <CartUpdateProvider>
      <div className="px-10 md:px-20 relative">
        <Header />
        <Toaster />
        {children}
      </div>
    </CartUpdateProvider>
  );
};

export default Provider;
