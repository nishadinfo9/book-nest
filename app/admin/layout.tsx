import React from "react";


import Link from "next/link";
import {
  Blocks,
  HomeIcon,
  Layers,
  Menu,
  Package2,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import Sidebar from "./_components/Sidebar";
// import Signout from "./_components/Signout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: HomeIcon },
    { label: "Products", href: "/admin/products", icon: Layers },
    { label: "Warehouses", href: "/admin/warehouses", icon: Warehouse },
    { label: "Deliver Persons", href: "/admin/delivery-persons", icon: Users },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Inventories", href: "/admin/inventories", icon: Blocks },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      {/* todo: change all links for mobile screens */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {navItems.map((item, i) => (
                  <SheetClose asChild key={i}>
                    <Link
                      href={item.href}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Badge variant={"outline"}>You are an {session?.user.role}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={session?.user.image} alt="Nishad" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                 <Link href={'/account'}>Account</Link>
              </DropdownMenuItem>
              {session && (
                <DropdownMenuItem>
                  {/* <Signout>Logout</Signout> */}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;