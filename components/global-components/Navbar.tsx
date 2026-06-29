"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, X } from "lucide-react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header className="w-full border-b border-gray-200">
      <nav
        className="
        max-w-7xl 
        mx-auto 
        h-20 
        px-6 
        flex 
        items-center
      "
      >
        {/* Logo - Fixed */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight flex items-center gap-2"
          >
            <Logo />
            BookNest
          </Link>
        </div>

        {/* Navigation - Fixed Center */}
        <div
          className="hidden md:flex items-center gap-8 text-sm font-medium  text-gray-700
        "
        >
          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <Link href="/books" className="hover:text-black">
            Books
          </Link>

          <Link href="/ebooks" className="hover:text-black">
            E-book
          </Link>

          <Link href="/about" className="hover:text-black">
            About
          </Link>
        </div>

        {/* Actions - Fixed width */}
        <div
          className="
          flex-1 
          flex 
          justify-end 
          items-center 
          gap-4
          relative
        "
        >
          {/* Search Expand */}
          {openSearch && (
            <div
              className="
              absolute
              right-40
              top-1/2
              -translate-y-1/2
              w-72
            "
            >
              <div className="relative">
                <Input
                  autoFocus
                  placeholder="Search books..."
                  className="pr-10 rounded-full"
                />

                <button
                  type="button"
                  className=" absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center"
                  onClick={() => setOpenSearch(false)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Search Icon */}
          {!openSearch && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpenSearch(true)}
            >
              <Search size={20} />
            </Button>
          )}

          {/* Wishlist */}
          <Button size="icon" variant="ghost" asChild>
            <Link href="/wishlist">
              <Heart size={20} />
            </Link>
          </Button>

          {/* Cart */}
          <Button size="icon" variant="ghost" asChild>
            <Link href="/cart">
              <ShoppingCart size={20} />
            </Link>
          </Button>

          {/* Avatar */}
          <Avatar className="cursor-pointer">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
}
