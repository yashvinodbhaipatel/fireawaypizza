import React from 'react';

function CategoryListSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 animate-pulse">
      <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
      <div className="w-16 h-4 bg-slate-200 rounded-md mt-2"></div>
    </div>
  );
}

export default CategoryListSkeleton;
