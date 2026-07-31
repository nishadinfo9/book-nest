import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import Link from "next/link";
import { signOut } from 'next-auth/react';

const ProfileDropdown = ({data}: {data: any}) => {


        const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/login',
      });
    } catch (error) {
      console.error(error);
    }
  };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='secondary'
                    size='icon'
                    className='rounded-full'
                >
                    <Avatar className='cursor-pointer '>
                        <AvatarImage
                            src={data?.user?.image}
                            alt={data?.user?.name ?? 'User'}
                        />
                        <AvatarFallback>
                            {' '}
                            {data?.user?.name?.charAt(0).toUpperCase() ?? 'U'}
                        </AvatarFallback>
                    </Avatar>

                    <span className='sr-only'>Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={'/account'}>Account</Link>
                </DropdownMenuItem>
                {data && (
                    <DropdownMenuItem onClick={handleLogout}>
                        Logout
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdown