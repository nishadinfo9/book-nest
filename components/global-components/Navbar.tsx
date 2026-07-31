'use client'

import Container from "../common/Container";
import Logo from "./logo";
import DesktopNav from "../layout/navbar/DesktopNav";
import SearchBox from "../layout/navbar/SearchBox";
import MobileNav from "../layout/navbar/MobileNav";
import NavActions from "../layout/navbar/NavActions";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/http/api";
import Link from "next/link";

export default function Navbar() {

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });


  return (
    <header
      className="
      sticky
      top-0
      z-50
      border-b
      bg-background/80
      backdrop-blur-xl
      "
    >
      <Container>

        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-10">

            <MobileNav />

            <Link
              href='/'
              className='flex items-center gap-2 text-2xl font-bold tracking-tight'
            >
              <Logo />
              BookNest
            </Link>

            <DesktopNav />

          </div>

          <SearchBox />

          <NavActions cartQty={cart?.summary?.totalQuantity} />

        </div>

      </Container>
    </header>
  );
}