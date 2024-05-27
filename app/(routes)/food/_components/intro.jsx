"use client";

import React from 'react';
import Image from 'next/image';

function Intro({ food }) {
    return (
        <div>
            {food?.banner?.url ? (
                <div>
                    <Image
                        src={food?.banner?.url}
                        width={1000}
                        height={300}
                        alt='banner'
                        className='w-full h-[220px] object-cover rounded-xl'
                    />
                </div>
            ) : (
                <div className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
            )}
            <h2 className='text-3xl font-bold mt-2'>{food.name}</h2>
            <div className='flex items-center gap-2 mt-2' >
                <Image src={'/star.png'} alt='star' width={20} height={20} />
                <label className='text-gray-500'>4.5</label>
            </div>
        </div>
    );
}

export default Intro;
