// components/SkeletonIntro.js
import React from 'react';
import './Skeleton.css'; // Include skeleton styles

const SkeletonIntro = () => {
  return (
    <div className="skeleton skeleton-intro">
      <div className="skeleton-header"></div>
      <div className="skeleton-content"></div>
    </div>
  );
};

export default SkeletonIntro;
