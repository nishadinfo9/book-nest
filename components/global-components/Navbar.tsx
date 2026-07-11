'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, X } from 'lucide-react';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { Badge } from '../ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/http/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState('');
  const { status, data } = useSession();

  console.log('data', data);

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'E-book', path: '/e-book' },
    { name: 'About', path: '/about' },
  ];

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
    <header className='w-full border-b border-gray-200'>
      <nav className='mx-auto flex h-20 max-w-7xl items-center px-6'>
        {/* Logo - Fixed */}
        <div className='flex-1'>
          <Link
            href='/'
            className='flex items-center gap-2 text-2xl font-bold tracking-tight'
          >
            <Logo />
            BookNest
          </Link>
        </div>

        {/* Navigation - Fixed Center */}
        <div className='hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex'>
          {navItems.map((item, i) => (
            <Link key={i} href={item.path} className='hover:text-black'>
              {item.name}
            </Link>
          ))}
          {status === 'authenticated' ? (
            <Link href='/admin/dashboard' className='hover:text-black'>
              Dashboard
            </Link>
          ) : null}
        </div>

        {/* Actions - Fixed width */}
        <div className='relative flex flex-1 items-center justify-end gap-4'>
          {/* Search Expand */}
          {openSearch && (
            <div className='absolute top-1/2 right-40 w-72 -translate-y-1/2'>
              <div className='relative pl-10'>
                <Input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search books...'
                  className='rounded-full pr-10'
                />

                <button
                  type='button'
                  className='absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center'
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
              size='icon'
              variant='ghost'
              onClick={() => setOpenSearch(true)}
            >
              <Search size={20} />
            </Button>
          )}

          {/* Wishlist */}
          <Button size='icon' variant='ghost' asChild>
            <Link href='/wishlist'>
              <Heart size={20} />
            </Link>
          </Button>

          {/* Cart */}
          <Button size='icon' variant='ghost' asChild className='relative'>
            <Link href='/cart'>
              <ShoppingCart size={20} />

              {cart?.summary?.totalQuantity > 0 && (
                <Badge className='absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1'>
                  {cart.summary.totalQuantity}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Avatar */}
          {status === 'authenticated' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  size='icon'
                  className='rounded-full'
                >
                  <Avatar className='cursor-pointer'>
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
          )}
        </div>
      </nav>
    </header>
  );
}
