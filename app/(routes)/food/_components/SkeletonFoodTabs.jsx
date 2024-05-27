// components/SkeletonFoodTabs.js
import React from 'react';
import './Skeleton.css'; // Include skeleton styles

const SkeletonFoodTabs = () => {
  return (
    <div className="skeleton skeleton-tabs">
      <div className="skeleton-tab"></div>
      <div className="skeleton-tab"></div>
      <div className="skeleton-tab"></div>
    </div>
  );
};

export default SkeletonFoodTabs;
