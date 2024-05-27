"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import GlobalApi from "../_utils/GlobalApi";
import { ArrowRightCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CategoryListSkeleton from './CategoryListSkeleton';

function CategoryList() {
    const listRef = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setSelectedCategory(params.get('category'));
    }, [params]);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            const resp = await GlobalApi.GetCategory();
            if (resp && resp.categories) {
                setCategoryList(resp.categories);
            } else {
                console.error('Categories not found in response', resp);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const scrollRightHandler = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mt-10 relative">
            <div className="flex gap-4 overflow-auto scrollbar-hide" ref={listRef}>
                {loading ? 
                    [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                        <CategoryListSkeleton key={index} />
                    )) : 
                    categoryList.map((category, index) => (
                        <Link href={`?category=${category.slug}`}
                            key={index}
                            className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:bg-orange-50 cursor-pointer hover:border-primary group ${selectedCategory === category.slug && 'text-primary border-primary bg-orange-50'}`}
                        >
                            <Image src={category.icon?.url} alt={category.name} width={40} height={40} className="hover:scale-125 transition-all duration-150" />
                            <h2 className="text-sm font-medium group-hover:text-primary">{category.name}</h2>
                        </Link>
                    ))
                }
            </div>
            <ArrowRightCircle
                className="absolute right-0 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer"
                onClick={scrollRightHandler}
            />
        </div>
    );
}

export default CategoryList;
