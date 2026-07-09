'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, X } from 'lucide-react';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { Badge } from '../ui/badge';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState('');
  const { status } = useSession();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'E-book', path: '/e-book' },
    { name: 'About', path: '/about' },
  ];

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

              {totalItems > 0 && (
                <Badge className='absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1'>
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Avatar */}
          <Avatar className='cursor-pointer'>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
}
