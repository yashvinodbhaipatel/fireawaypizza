"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import GlobalApi from "../_utils/GlobalApi";
import FoodItem from "./FoodItem";
import FoodItemSkeleton from "./FoodItemSkeleton";

function FoodList() {
    const params = useSearchParams();
    const [category, setCategory] = useState('all');
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const categoryParam = params.get('category');
        if (categoryParam) {
            setCategory(categoryParam);
            getFoodList(categoryParam);
        }
    }, [params]);

    const getFoodList = (category_) => {
        setLoading(true);
        GlobalApi.getFood(category_).then(resp => {
            setFoodList(resp?.bestSellings || []);
            setLoading(false);
        });
    };

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl'>Popular {category} </h2>
            <h2 className='font-bold text-primary'>{foodList?.length} Results</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3'>
                {!loading ? foodList.map((bestSelling, index) => (
                    <FoodItem key={index} food={bestSelling} />
                )) : 
                [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <FoodItemSkeleton key={item} />
                ))}
            </div>
        </div>
    );
}

export default FoodList;
