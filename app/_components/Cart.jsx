import React, { useContext } from 'react';
import './cart.css';
import { toast } from 'sonner';
import api from '../_utils/GlobalApi';
import { useCartUpdateContext } from '../_context/CartUpdateContext';

function Cart({ cart, setCart }) {
  const { updateCart, setUpdateCart } = useCartUpdateContext();

  const calculateTotalWithGST = (item) => {
    const addonsArray = Array.isArray(item.addons)
      ? item.addons
      : [{ name: item.addons, price: item.addonsPrice }];

    const addonsTotal = addonsArray.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = item.price + addonsTotal;
    const totalWithGST = totalPrice * 1.05; // Applying 5% GST
    return Math.ceil(totalWithGST); // Rounded up to the nearest integer
  };

  const handleRemoveItem = async (id) => {
    try {
      await api.removeFromCart(id);
      const updatedCart = cart.filter(item => item.id !== id);
      setUpdateCart(!updateCart); // Trigger update in context
      toast.success('Item removed from cart');
    } catch (error) {
      let errorMessage = 'Failed to remove item from cart';
      if (error.response && error.response.errors) {
        const errors = error.response.errors.map(err => err.message).join(', ');
        errorMessage += `: ${errors}`;
      } else if (error.response && error.response.status === 401) {
        errorMessage = 'Unauthorized error. Please check your API credentials.';
      } else if (error.response && error.response.status === 403) {
        errorMessage = 'Authorization error. Please check your credentials.';
      } else {
        console.error('Error:', error); // Log detailed error for debugging
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="">
      <div className='mt-5'>
        <h2 className='font-bold text-lg'>My Order</h2>
      </div>
      <div className="max-h-60 overflow-y-auto custom-scrollbar">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex mb-4 p-2 border rounded-lg items-center">
              <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-md" />
              <div className="ml-4 flex-grow">
                <h2 className="text-sm font-bold">{item.productName}</h2>
                <p className="font-semibold text-sm">Price: ₹ {item.price.toFixed(2)}</p>
                {item.addons && (
                  <div className="mt-2">
                    <h3 className="font-semibold text-sm">Add-ons:</h3>
                    <ul className="text-sm list-inside">
                      {Array.isArray(item.addons)
                        ? item.addons.map(addon => (
                            <li key={addon.id}>
                              {addon.name} - ₹ {addon.price.toFixed(2)}
                            </li>
                          ))
                        : (
                            <li>
                              {item.addons} - ₹ {item.addonsPrice.toFixed(2)}
                            </li>
                          )}
                    </ul>
                  </div>
                )}
              </div>
              <div className="text-right">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item?.id)}
                >
                  x
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
      {cart.length > 0 && (
        <div className="mt-4">
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
            Checkout ₹ {Math.ceil(cart.reduce((total, item) => total + parseFloat(calculateTotalWithGST(item)), 0))}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
