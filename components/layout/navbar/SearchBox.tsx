'use client';

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import SearchSuggestion from "@/app/(client)/search/_components/SearchSuggestion";
import { useTypewriter } from "react-simple-typewriter";

export default function SearchBox() {

    const router = useRouter();
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const debounced = useDebounce(search);
    const { data = [], isLoading } = useSearchSuggestions(debounced);

    function onSubmit() {
        if (!search.trim()) return;
        setIsOpen(false);
        router.push(`/search?term=${search}`);
    }

    const [placeholder] = useTypewriter({
        words: [
            "Search Harry Potter by J.K. Rowling",
            "Search Atomic Habits by James Clear",
            "Search Rich Dad Poor Dad by Robert Kiyosaki",
            "Search The Alchemist by Paulo Coelho",
            "Search Ikigai by Héctor García",
            "Search Psychology of Money by Morgan Housel",
            "Search books by Stephen King",
            "Search fiction, self-help or history books",
        ],
        loop: 0,
        typeSpeed: 70,
        deleteSpeed: 25,
        delaySpeed: 1500,
    });

    return (

        <div className="relative hidden w-full max-w-xl lg:block">
            <Input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setIsOpen(true);
                }
                }
                placeholder={search ? "" : placeholder}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {
                        onSubmit()
                    }

                }}
            />
            <button
                onClick={onSubmit}
                className="absolute right-0 top-0 h-full rounded-r-md bg-primary px-6 text-white"
            >
                <Search className="size-4" />
            </button>

            {isOpen && search && (
                <SearchSuggestion
                    books={data}
                    loading={isLoading}
                />
            )}

        </div>

    )

}