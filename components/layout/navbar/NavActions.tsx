import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProfileDropdown from "./ProfileDropdown";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavActions({cartQty}: {cartQty: number}) {
   const { status, data } = useSession();
 
  return (
    <div className="flex items-center gap-2">

      <Link href={'/wishlist'}>
      <Button
        size="icon"
        variant="ghost"
        className="relative"
      >
        <Heart className="size-5"/>

        <Badge
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
        >
          1
        </Badge>
      </Button>
      </Link>

      <Link href={'/cart'}>
      <Button
        size="icon"
        variant="ghost"
        className="relative"
      >
        <ShoppingCart className="size-5"/>
        {cartQty > 0 && (
          <Badge
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
        >
          {cartQty}
        </Badge>
        )}

        
      </Button>
      </Link>

     <div className="pl-3">
       {status === 'authenticated' && (
           <ProfileDropdown data={data}/>
          )}
     </div>

    </div>
  );
}