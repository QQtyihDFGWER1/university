/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, BookOpen } from 'lucide-react';
import { Language, TranslationSet } from '../types';

interface FooterProps {
  lang: Language;
  t: TranslationSet;
}

export default function Footer({ lang, t }: FooterProps) {
  const isRtl = lang === 'fa';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1E36] text-gray-300 py-8 border-t border-[#C9A87C]/20 transition-all duration-300 mt-16" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright Info */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <BookOpen className="h-4 w-4 text-[#C9A87C]" />
            <p className="font-vazir text-center md:text-initial leading-relaxed">
              &copy; {currentYear} {t.allRightsReserved}
            </p>
          </div>

          {/* Academic Slogan / Verification Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-vazir bg-white/5 border border-white/10 rounded-full px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {lang === 'en' 
                  ? 'Official Portal Status: Verified & Secure' 
                  : 'وضعیت درگاه رسمی: تایید شده و ایمن'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
