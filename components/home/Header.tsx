'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-neutral-100">
      <div className="container mx-auto max-w-[1500px] px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/logo.png"
              alt="Quiz.go"
              width={140}
              height={45}
              priority
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-neutral-600">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-neutral-600">
                Dashboard
              </Button>
            </Link>
            <Button className="bg-[#98FB98] hover:bg-[#90EE90] text-neutral-800">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}