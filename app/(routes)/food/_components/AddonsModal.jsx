"use client";

import React from 'react';

function AddonsModal({ addons, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-5 rounded-lg shadow-lg max-w-lg w-full'>
        <h2 className='text-xl font-bold mb-4'>Select Addons</h2>
        {addons?.length > 0 ? (
          <div className='flex flex-col gap-3'>
            {addons.map((addon, index) => (
              <div key={index} className='flex justify-between items-center'>
                <span>{addon.name}</span>
                <span>₹ {addon.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No addons available.</p>
        )}
        <button
          onClick={onClose}
          className='mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg'
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddonsModal;
