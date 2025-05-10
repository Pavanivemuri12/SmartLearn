<<<<<<< Updated upstream
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return (
    <div className="p-6">
      <Categories
        items={categories}
      />
    </div>
  );
=======
import { db } from "@/lib/db"

import {Categories} from "@/components/categories"
import {SearchInput} from "@/components/ui/search-input";
const SearchPage = async () => {
    const categories = await db.category.findMany({
        orderBy:{
            name:"asc"
        }
    })
return(
    <>
       <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput/>
       </div>
       <div className="p-6">
        <Categories
            items={categories}
            />
       </div>
    </>
    );
>>>>>>> Stashed changes
}
export default SearchPage;
