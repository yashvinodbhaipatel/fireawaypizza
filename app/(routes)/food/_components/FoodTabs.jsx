"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from './MenuSection';

function FoodTabs({ food }) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10">
      <TabsList className='bg-gray-100'>
        <TabsTrigger value="category" >Category</TabsTrigger>
        <TabsTrigger value="about" >About</TabsTrigger>
        <TabsTrigger value="reviews" >Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="about">About</TabsContent>
      <TabsContent value="reviews">Reviews</TabsContent>
    </Tabs>
  );
}

export default FoodTabs;
