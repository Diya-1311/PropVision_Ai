'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Menu, X, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Overview', href: '/' },
  { label: 'Find Property', href: '/properties/recommend' },
  { label: 'Societies', href: '/societies' },
  { label: 'Community Deals', href: '/society/deals' },
  { label: 'Service Matching', href: '/services/request' },
  { label: 'Providers', href: '/providers' },
  { label: 'Research', href: '/research' },
  { label: 'Admin', href: '/admin' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<'Resident' | 'Society' | 'Provider'>('Resident');

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xs group-hover:bg-indigo-700 transition">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-extrabold text-base tracking-tight leading-none">
                PROPVISION <span className="text-indigo-600">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider">
                SMART HOUSING ECOSYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 relative ${
                  isActive(link.href)
                    ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right: AI Engine Online + Demo User Selector + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* AI Engine Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-800">AI Engine Online</span>
            </div>

            {/* Demo User Role Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 border border-slate-200/80 rounded-xl px-2.5 py-1 text-xs">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Resident">Resident Demo</option>
                <option value="Society">Society Demo</option>
                <option value="Provider">Provider Demo</option>
              </select>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1 pb-3 mb-2 border-b border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive(link.href)
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>AI Engine Online</span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">{role} Active</span>
          </div>
        </div>
      )}
    </nav>
  );
}
