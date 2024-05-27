import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function FoodItem({food}) {
  return (
    <Link href={'/food/'+food?.slug} className='p-3 hover:border rounded-xl hover:border-primary  hover:bg-orange-50'>
      <Image src={food.banner?.url} alt={food.name}
      width={500}
      height={130}
      className='h-[130px] rounded-xl object-cover'
      />
      <div className='mt-2'>
        <h2 className='font-bold text-lg'>{food.name}</h2>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <Image src="/star.png" alt='star' 
                width={14}
                height={14}
                />
                <label className='text-gray-400'>4.5</label>
                <h2 className='text-gray-400 text-sm'>{food?.foodType[0]}</h2>
            </div>
            <h2 className='text-sm text-primary'>{food.categories[0].name}</h2>
        </div>
      </div>
    </Link>
  )
}

export default FoodItem
