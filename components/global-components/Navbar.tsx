'use client'

import Container from "../common/Container";
import Logo from "./logo";
import DesktopNav from "../layout/navbar/DesktopNav";
import SearchBox from "../layout/navbar/SearchBox";
import MobileNav from "../layout/navbar/MobileNav";
import NavActions from "../layout/navbar/NavActions";
import { useQuery } from "@tanstack/react-query";
import { getCart, getMyWishlists } from "@/http/api";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {

  const {status, data} = useSession();
  console.log(status, )

  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });

   const { data: wishlistData = [] } = useQuery({
      queryKey: ['my-wishlists'],
      queryFn: getMyWishlists,
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

            <DesktopNav status={status}/>

          </div>

          <SearchBox />

          <NavActions wishlistData={wishlistData} cartQty={cart?.summary?.totalItems} />

        </div>

      </Container>
    </header>
  );
}