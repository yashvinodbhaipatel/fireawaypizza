"use client";

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { SquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { CartUpdateContext } from '../../../_context/CartUpdateContext'; 

function MenuSection({ food }) {
  const [menuItemList, setMenuItemList] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState({});
  const { user } = useUser();
  const {updateCart,setUpdateCart}=useContext(CartUpdateContext);

  useEffect(() => {
    if (food?.menu?.length > 0) {
      const allMenuItems = food.menu.flatMap(menu => menu.menuItem);
      setMenuItemList(allMenuItems);
    }
  }, [food]);

  const handleExpandClick = (index) => {
    setExpandedItemIndex(expandedItemIndex === index ? null : index);
  };

  const handleAddonChange = (itemIndex, addonIndex, addon) => {
    setSelectedAddons((prevSelectedAddons) => {
      const itemAddons = prevSelectedAddons[itemIndex] || {};
      if (itemAddons[addonIndex]) {
        delete itemAddons[addonIndex];
      } else {
        itemAddons[addonIndex] = addon;
      }
      return {
        ...prevSelectedAddons,
        [itemIndex]: itemAddons
      };
    });
  };

  const addToCartHandler = (item, itemIndex) => {
    toast.info('Adding to Cart...');
    const selectedAddonsForItem = selectedAddons[itemIndex] || {};
    const addons = Object.values(selectedAddonsForItem);
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: item?.name,
      description: item?.description,
      productImage: item?.productImage?.url,
      price: item?.price,
      addons: addons.map(addon => addon.name).join(', '),
      addonsPrice: addons.reduce((total, addon) => total + addon.price, 0) || 0
    };

    GlobalApi.AddToCart(data)
      .then((resp) => {
        setUpdateCart(!updateCart);
        toast.success('Added to Cart');
      })
      .catch((error) => {
        toast.error('Error while adding to the cart');
      });
  };

  return (
    <div>
      <div className='grid grid-cols-4 mt-2'>
        <div className='hidden md:flex flex-col mr-10 gap-2'>
          {food?.foodType?.map((type, index) => (
            <button
              key={index}
              className='flex justify-start hover:bg-gray-100'
            >
              {type}
            </button>
          ))}
        </div>
        <div className='md:col-span-3 col-span-4'>
          {menuItemList.length > 0 && (
            <h2 className='font-extrabold text-lg'>{menuItemList[0]?.categories}</h2>
          )}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
            {menuItemList.map((item, index) => (
              <div key={index} className='p-2 flex flex-col gap-3 border rounded-xl hover:border-primary cursor-pointer'>
                <div className='flex gap-3'>
                  <Image
                    src={item?.productImage?.url}
                    alt={item.name}
                    width={120}
                    height={120}
                    className='object-cover w-[120px] h-[120px] rounded-xl'
                    priority={index === 0} // Add priority to the first image
                  />
                  <div className='flex flex-col gap-1'>
                    <h3 className='font-bold'>{item.name}</h3>
                    <p>₹ {item.price}</p>
                    <p className='text-sm text-gray-400 line-clamp-2'>{item.description}</p>
                    <SquarePlus onClick={() => handleExpandClick(index)} className="cursor-pointer" />
                  </div>
                </div>
                {expandedItemIndex === index && (
                  <div className='mt-3 p-2 border-t'>
                    <h4 className='font-bold mb-2'>Addons</h4>
                    {item.addons?.length > 0 ? (
                      <ul className='list-disc pl-5'>
                        {item.addons.map((addon, addonIndex) => (
                          <li key={addonIndex} className='flex justify-between'>
                            <label>
                              <input
                                type="checkbox"
                                onChange={() => handleAddonChange(index, addonIndex, addon)}
                                checked={!!selectedAddons[index]?.[addonIndex]}
                              />
                              <span className='ml-2'>{addon.name}</span>
                            </label>
                            <span>₹ {addon.price}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No addons available.</p>
                    )}
                    <Button onClick={() => addToCartHandler(item, index)} className='mt-2'>Add to Cart</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MenuSection);
