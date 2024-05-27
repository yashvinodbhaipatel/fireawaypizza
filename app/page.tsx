import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import FoodList from "./_components/FoodList";

export default function Home() {
 
  return (
    <div>
      <CategoryList />
      <FoodList />
    </div>
  );
}
