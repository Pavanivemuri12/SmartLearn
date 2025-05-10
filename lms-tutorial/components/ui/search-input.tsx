"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce"; // Ensure the path is correct
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Adjust path as needed
import qs from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState(""); // ✅ Corrected: Destructuring from useState
  const debouncedValue = useDebounce(value, 600);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true } // ✅ Moved outside the object
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, pathname, router]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for courses"
      />
    </div>
  );
};
