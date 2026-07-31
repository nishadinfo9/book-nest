import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { navigation } from "./navigation";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>

        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
        >
          <Menu />
        </Button>

      </SheetTrigger>

      <SheetContent side="left">

        <div className="mt-8 flex flex-col gap-5">

          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
            >
              {item.title}
            </Link>
          ))}

          <Link
              href={'/admin/dashboard'}
            >
              Dashboard
            </Link>

        </div>

      </SheetContent>
    </Sheet>
  );
}