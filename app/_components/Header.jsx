"use client";

import React, { useEffect, useContext, useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';
import Cart from './Cart';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("execute Me!");
    if (user) {
      GetUserCart(user.primaryEmailAddress.emailAddress);
    }
  }, [updateCart, user]);

  const GetUserCart = async (email) => {
    try {
      const resp = await GlobalApi.GetUserCart(email);
      console.log(resp);
      setCart(resp?.userCarts);
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
    }
  };

  return (
    <div className='flex justify-between items-center p-6 md:px-20 shadow-sm'>
      <Image src='/logo.png' alt='logo' width={100} height={50} />
      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
        <input type='text' className='bg-transparent outline-none flex-grow' placeholder="Search..." />
        <Search className='ml-2 text-primary' />
      </div>
      {isSignedIn ? (
        <div className='flex gap-3 items-center'>
          <Popover>
            <PopoverTrigger asChild>
              <div className='flex gap-2 items-center cursor-pointer'>
                <ShoppingCart />
                <label className='p-1 px-3 rounded-full bg-slate-200'>
                  {cart?.length}
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent className='bg-white '>
              <Cart cart={cart} />
            </PopoverContent>
          </Popover>
          <UserButton />
        </div>
      ) : (
        <div className='flex gap-5'>
          <SignInButton mode='modal'>
            <Button variant="outline" className="mr-2">Login</Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button className='bg-orange-500 text-white'>Signup</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header;
