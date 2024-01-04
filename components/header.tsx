'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center"
          >
            <span className="font-bold text-xl md:hidden">Techno Cashier</span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:block">
            <div className="p-3 h-8 rounded-full bg-amber-300 flex items-center justify-center text-center">
              <span className="font-semibold text-sm">Fubuki Shirakami - Admin</span>
            </div>
          </div>

          <div className="block">
            <div className="p-3 h-8 rounded bg-amber-300 flex items-center justify-center text-center">
              <span className="font-semibold text-sm">Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
