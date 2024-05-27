"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import Intro from '../_components/Intro';
import FoodTabs from '../_components/FoodTabs';
import MenuSection from '../_components/MenuSection';
import SkeletonIntro from '../_components/SkeletonIntro';
import SkeletonFoodTabs from '../_components/SkeletonFoodTabs';
import SkeletonMenuSection from '../_components/SkeletonMenuSection';

function FoodDetail() {
  const param = usePathname();
  const [food, setFood] = useState(null);

  const GetFoodDetail = useCallback(async (foodSlug) => {
    try {
      const resp = await GlobalApi.GetFoodDetail(foodSlug);
      setFood(resp.bestSelling);
    } catch (error) {
      console.error('Error fetching food detail:', error);
    }
  }, []);

  useEffect(() => {
    const foodSlug = param.split("/")[2];
    if (foodSlug) {
      GetFoodDetail(foodSlug);
    }
  }, [param, GetFoodDetail]);

  console.log('FoodDetail rendered'); // Debugging line to check rendering

  return (
    <div>
      {food ? (
        <>
          <Intro food={food} />
          <FoodTabs food={food} />
          <MenuSection food={food} />
        </>
      ) : (
        <>
          <SkeletonIntro />
          <SkeletonFoodTabs />
          <SkeletonMenuSection />
        </>
      )}
    </div>
  );
}

export default React.memo(FoodDetail);
