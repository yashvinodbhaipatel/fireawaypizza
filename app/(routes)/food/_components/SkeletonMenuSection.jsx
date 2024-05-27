// components/SkeletonMenuSection.js
import React from 'react';
import './Skeleton.css'; // Include skeleton styles

const SkeletonMenuSection = () => {
  return (
    <div className="skeleton skeleton-menu-section">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
  );
};

export default SkeletonMenuSection;
