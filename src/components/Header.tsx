/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LogOut, Languages } from 'lucide-react';
import { Language, UserRole, TranslationSet } from '../types';

interface HeaderProps {
  lang: Language;
  onLanguageToggle: () => void;
  role: UserRole;
  onLogout: () => void;
  t: TranslationSet;
}

export default function Header({ lang, onLanguageToggle, role, onLogout, t }: HeaderProps) {
  const isRtl = lang === 'fa';

  return (
    <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-all duration-300">
      {/* Golden premium accent top line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0B1E36] via-[#C9A87C] to-[#0B1E36]"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo & Branding Area */}
          <div className="flex items-center gap-3.5 group cursor-pointer">
            {/* Highly Elegant & Modern Academic University Crest (Islamic-Iranian Shamsa & Qalam) */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A87C]/30 bg-[#0B1E36] shadow-xl ring-4 ring-[#0B1E36]/5 hover:scale-105 hover:shadow-2xl hover:border-[#C9A87C]/80 transition-all duration-300">
              <svg className="h-10 w-10 text-[#C9A87C]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF2DF" />
                    <stop offset="40%" stopColor="#D8B47C" />
                    <stop offset="100%" stopColor="#8C6D3B" />
                  </linearGradient>
                  <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1E3E62" />
                    <stop offset="50%" stopColor="#0B1E36" />
                    <stop offset="100%" stopColor="#050F1D" />
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C9A87C" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Outer Geometric Star (Traditional Islamic Shamseh - Overlapping Rotated Squares) */}
                <rect x="14" y="14" width="72" height="72" rx="3" transform="rotate(0 50 50)" stroke="url(#goldGrad)" strokeWidth="1" className="opacity-80" />
                <rect x="14" y="14" width="72" height="72" rx="3" transform="rotate(45 50 50)" stroke="url(#goldGrad)" strokeWidth="1" className="opacity-80" />
                
                {/* Secondary Nested Rotated Squares for Fine Intricate Border */}
                <rect x="18" y="18" width="64" height="64" rx="2" transform="rotate(22.5 50 50)" stroke="url(#goldGrad)" strokeWidth="0.6" className="opacity-50" />
                <rect x="18" y="18" width="64" height="64" rx="2" transform="rotate(67.5 50 50)" stroke="url(#goldGrad)" strokeWidth="0.6" className="opacity-50" />

                {/* Main Circular Medallion Shield (Lapis Lazuli tile aesthetic) */}
                <circle cx="50" cy="50" r="30" fill="url(#shieldGrad)" stroke="url(#goldGrad)" strokeWidth="2" />
                
                {/* Internal Dotted Ring representing Illuminated Manuscripts */}
                <circle cx="50" cy="50" r="26" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="1.5 2" className="opacity-70" />

                {/* Traditional Calligraphy Reed Pen (قلم نی - Qalam) */}
                {/* The reed pen body crossing vertically */}
                <path d="M48.5 22 L51.5 22 L51.5 60 L48.5 60 Z" fill="url(#goldGrad)" className="opacity-95" />
                {/* Traditional angled pen nib cut (Qat) with a fine ink-slit */}
                <path d="M48.5 22 L51.5 17 L51.5 22 Z" fill="url(#goldGrad)" />
                <line x1="50" y1="18" x2="50" y2="28" stroke="#0B1E36" strokeWidth="0.6" />

                {/* Stylized Open Book of Wisdom */}
                {/* Left Page */}
                <path d="M31 52 C37 49 44 51 50 55 V39 C44 35 37 33 31 36 Z" fill="url(#shieldGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Right Page */}
                <path d="M69 52 C63 49 56 51 50 55 V39 C56 35 63 33 69 36 Z" fill="url(#shieldGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Center Book Seam */}
                <line x1="50" y1="38" x2="50" y2="55" stroke="url(#goldGrad)" strokeWidth="1.5" />

                {/* Traditional Arabesque Floral/Eslimi Spirals (اسلیمی) cradling the book */}
                {/* Left Eslimi curve */}
                <path d="M26 48 C24 58 35 64 42 59" stroke="url(#goldGrad)" strokeWidth="1" fill="none" strokeLinecap="round" className="opacity-80" />
                {/* Right Eslimi curve */}
                <path d="M74 48 C76 58 65 64 58 59" stroke="url(#goldGrad)" strokeWidth="1" fill="none" strokeLinecap="round" className="opacity-80" />

                {/* Dynamic Flame of Divine Knowledge (Nour - نور) rising from the Qalam */}
                <path d="M50 15 C52 11 54 8 50 3 C46 8 48 11 50 15 Z" fill="url(#goldGrad)" />
                <path d="M50 13 C51 10 52 8 50 5 C48 8 49 10 50 13 Z" fill="url(#glowGrad)" />

                {/* Twin Golden Dots of Academic Excellence */}
                <circle cx="36" cy="27" r="1.5" fill="url(#goldGrad)" />
                <circle cx="64" cy="27" r="1.5" fill="url(#goldGrad)" />
              </svg>
              
              {/* Glowing active/secure status badge dot */}
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-md"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#0B1E36] md:text-xl font-vazir group-hover:text-[#C9A87C] transition-colors">
                {t.brandName}
              </span>
            </div>
          </div>

          {/* Controls & Actions Area */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Toggle Button */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:border-[#C9A87C] hover:bg-[#F8F6F1] focus:outline-none focus:ring-2 focus:ring-[#C9A87C] transition-all"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4 text-[#C9A87C]" />
              <span className="text-xs uppercase font-semibold">
                {lang === 'en' ? 'فارسی (FA)' : 'English (EN)'}
              </span>
            </button>

            {/* Portal Role Badge & Logout (If Logged In) */}
            {role && (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Role Badge */}
                <span className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  role === 'admin' 
                    ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                    : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                }`}>
                  {role === 'admin' ? t.adminPortal : t.studentPortal}
                </span>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-50 border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100 hover:text-rose-800 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-xs font-semibold">{t.logout}</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
