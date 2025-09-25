'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; 

  const menu = [
    { id: 'dashboard', title: '대시보드', path: '/' },
    { id: 'posts', title: '게시판', path: '' },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 text-gray-700 h-screen p-4 flex flex-col ${
        isOpen ? 'w-48' : 'w-12'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && (
          <h2 className="text-xl font-bold select-none text-blue-600">
            HanaLoop
          </h2>
        )}
        <span
          className="cursor-pointer text-gray-500 hover:text-blue-600"
          onClick={toggle}
        >
          {isOpen ? '◀' : '▶'}
        </span>
      </div>

      {isOpen && (
        <nav className="flex-1 font-semibold">
          {menu.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center w-full p-2 mb-2 rounded transition-colors
                ${pathname === item.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      )}
    </aside>
  );
}
