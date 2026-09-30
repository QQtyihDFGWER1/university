/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldAlert, KeyRound, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { Language, UserRole, TranslationSet } from '../types';
import iranianFlag from '../assets/images/iranian_flag_1784445122045.jpg';

interface LoginPortalProps {
  lang: Language;
  onLoginSuccess: (role: UserRole) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  t: TranslationSet;
}

export default function LoginPortal({ lang, onLoginSuccess, onShowToast, t }: LoginPortalProps) {
  const [selectedPortal, setSelectedPortal] = useState<'student' | 'admin'>('student');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRtl = lang === 'fa';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);

    // Simulate subtle login delay for high-quality UX feel
    setTimeout(() => {
      const normalizedPass = password.replace(/\s+/g, '');
      
      if (selectedPortal === 'student') {
        if (normalizedPass === '14001400') {
          onLoginSuccess('student');
          onShowToast(lang === 'en' ? 'Welcome to Student Portal!' : 'به پرتال دانشجویی خوش آمدید!', 'success');
        } else {
          onShowToast(t.wrongPass, 'error');
        }
      } else {
        if (normalizedPass === '00410041') {
          onLoginSuccess('admin');
          onShowToast(lang === 'en' ? 'Access Granted. Welcome Admin!' : 'دسترسی تأیید شد. به داشبورد مدیریت خوش آمدید!', 'success');
        } else {
          onShowToast(t.wrongPass, 'error');
        }
      }
      setIsLoading(false);
      setPassword('');
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Elegant, Small & Neatly Arranged Flag Emblem */}
      <div className="flex items-center justify-center gap-4 py-3.5 px-6 bg-white border border-gray-200/80 rounded-2xl shadow-sm max-w-[350px] mx-auto hover:border-[#C9A87C]/40 hover:shadow-md transition-all duration-300 group">
        <div className="relative h-11 w-[76px] overflow-hidden rounded-md border border-gray-200 shadow-sm shrink-0">
          <img 
            src={iranianFlag} 
            alt="Flag of Iran" 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col text-start">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold font-inter leading-none">
            {lang === 'en' ? 'Islamic Republic of Iran' : 'جمهوری اسلامی ایران'}
          </span>
          <span className="text-[13px] font-bold text-[#0B1E36] font-vazir leading-none mt-2">
            {lang === 'en' ? 'Ministry of Education' : 'وزارت آموزش و پرورش'}
          </span>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100/80 bg-white">
        {/* Decorative Top Accent Card */}
        <div className="bg-gradient-to-r from-[#0B1E36] via-[#152e4f] to-[#0B1E36] p-8 text-center border-b border-[#C9A87C]/20">
          <h1 className="text-2xl font-bold text-[#C9A87C] font-vazir mb-1">
            {t.appTitle}
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm font-medium">
            {lang === 'en' ? 'Daneshvar Pouya Academic Feedback System' : 'سامانه نظرات و بازخوردهای دانشگاهی دانشور پویا'}
          </p>
        </div>

        {/* Main Login Area */}
        <div className="bg-white px-6 py-8">
        
        {/* Portal Role Selector Cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Student Selector */}
          <button
            type="button"
            onClick={() => {
              setSelectedPortal('student');
              setPassword('');
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              selectedPortal === 'student'
                ? 'border-[#C9A87C] bg-gradient-to-b from-[#0B1E36]/5 to-[#0B1E36]/10 text-[#0B1E36] shadow-md scale-[1.02]'
                : 'border-gray-100 bg-gray-50/50 text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            <User className={`h-6 w-6 mb-2 transition-transform duration-300 ${selectedPortal === 'student' ? 'text-[#0B1E36] scale-110' : 'text-gray-400'}`} />
            <span className="text-xs sm:text-sm font-bold font-vazir">{t.studentPortal}</span>
          </button>

          {/* Admin Selector */}
          <button
            type="button"
            onClick={() => {
              setSelectedPortal('admin');
              setPassword('');
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              selectedPortal === 'admin'
                ? 'border-[#C9A87C] bg-gradient-to-b from-[#0B1E36]/5 to-[#0B1E36]/10 text-[#0B1E36] shadow-md scale-[1.02]'
                : 'border-gray-100 bg-gray-50/50 text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            <ShieldAlert className={`h-6 w-6 mb-2 transition-transform duration-300 ${selectedPortal === 'admin' ? 'text-[#0B1E36] scale-110' : 'text-gray-400'}`} />
            <span className="text-xs sm:text-sm font-bold font-vazir">{t.adminPortal}</span>
          </button>
        </div>

        {/* Password Submission Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              {t.enterPass}
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={selectedPortal === 'student' ? '1400 1400' : '••••••••'}
                className={`block w-full ${isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg text-sm bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A87C] focus:border-[#C9A87C] transition-all`}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Guide Hints (Only shown for Student portal to protect Admin credentials) */}
          {selectedPortal === 'student' && (
            <div className="flex items-start gap-2 p-3 bg-[#F8F6F1] border border-[#C9A87C]/25 rounded-lg text-xs text-gray-600">
              <Info className="h-4 w-4 text-[#C9A87C] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">
                  {lang === 'en' ? 'Official Password Hint' : 'راهنمای کلمه عبور'}
                </p>
                <p className="font-mono">
                  {t.studentPassHint}
                </p>
                <p className="text-gray-500 mt-1">
                  {lang === 'en' ? 'Note: Spaces in password are automatically sanitized.' : 'نکته: فضاهای خالی به طور خودکار پاک می‌شوند.'}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B1E36] hover:bg-[#152e4f] text-white font-bold py-3 px-4 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-vazir"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{t.loginBtn}</span>
                {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </>
            )}
          </button>
        </form>

      </div>
      </div>
    </div>
  );
}
