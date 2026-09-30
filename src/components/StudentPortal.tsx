/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  History, 
  PlusCircle,
  Hash
} from 'lucide-react';
import { Suggestion, Language, TranslationSet } from '../types';

interface StudentPortalProps {
  lang: Language;
  ownSuggestions: Suggestion[];
  onAddSuggestion: (subject: string, text: string, category: 'educational' | 'welfare' | 'cultural' | 'administrative') => void;
  t: TranslationSet;
}

export default function StudentPortal({ lang, ownSuggestions, onAddSuggestion, t }: StudentPortalProps) {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'educational' | 'welfare' | 'cultural' | 'administrative'>('educational');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRtl = lang === 'fa';

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'educational': return t.catEducational;
      case 'welfare': return t.catWelfare;
      case 'cultural': return t.catCultural;
      case 'administrative': return t.catAdministrative;
      default: return cat;
    }
  };

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'educational': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'welfare': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'cultural': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'administrative': return 'bg-teal-50 text-teal-700 border-teal-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !text.trim()) return;

    setIsSubmitting(true);
    
    // Smooth micro-interaction lag for professional UX feedback
    setTimeout(() => {
      onAddSuggestion(subject.trim(), text.trim(), category);
      setSubject('');
      setText('');
      setCategory('educational');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Upper Welcome Banner */}
      <div className="mb-8 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-initial">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E36] font-vazir flex items-center justify-center md:justify-start gap-2">
            <span className="text-[#C9A87C]">✦</span> {t.studentPortal}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {t.studentViewSub}
          </p>
        </div>

        {/* Dynamic Badge Guarantee */}
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 shrink-0">
          <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
          <div className="text-initial">
            <h4 className="text-xs sm:text-sm font-bold text-emerald-800 font-vazir">{t.quickNote}</h4>
            <p className="text-[11px] sm:text-xs text-emerald-600 mt-0.5 leading-normal max-w-[200px]">
              {lang === 'en' 
                ? 'Zero cookies, trackers or server accounts. Completely private.' 
                : 'بدون کوکی، ردیاب یا حساب کاربری. کاملا خصوصی.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Columns on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#0B1E36]/5 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-[#C9A87C]" />
              <h3 className="font-bold text-[#0B1E36] font-vazir text-sm sm:text-base">
                {t.studentViewTitle}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Subject & Category Grid Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    {t.subject} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.subjectPlaceholder}
                    maxLength={100}
                    className="block w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-xs sm:text-sm bg-gray-50/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A87C] focus:border-[#C9A87C] transition-all font-vazir"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Category Dropdown Selector */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    {t.category} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="block w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-xs sm:text-sm bg-gray-50/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A87C] focus:border-[#C9A87C] transition-all font-vazir"
                    disabled={isSubmitting}
                  >
                    <option value="educational">{t.catEducational}</option>
                    <option value="welfare">{t.catWelfare}</option>
                    <option value="cultural">{t.catCultural}</option>
                    <option value="administrative">{t.catAdministrative}</option>
                  </select>
                </div>
              </div>

              {/* Suggestion Textarea */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    {t.suggestion} <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-mono">
                    {text.length} / 1000
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t.suggestionPlaceholder}
                  maxLength={1000}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg text-xs sm:text-sm bg-gray-50/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A87C] focus:border-[#C9A87C] transition-all font-vazir leading-relaxed resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Warnings and Submit Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-amber-600 text-xs">
                  <HelpCircle className="h-4 w-4 shrink-0" />
                  <span className="leading-tight">
                    {lang === 'en' 
                      ? 'No personal details will be saved with this post.' 
                      : 'هیچ مشخصات شخصی با این ارسال ذخیره نخواهد شد.'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !subject.trim() || !text.trim()}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-[#0B1E36] hover:bg-[#152e4f] text-[#C9A87C] font-bold py-3 px-6 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-vazir"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-[#C9A87C] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                      <span>{t.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* History Container (5 Columns on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <History className="h-5 w-5 text-[#C9A87C]" />
              <h3 className="font-bold text-[#0B1E36] font-vazir text-sm sm:text-base">
                {t.yourSubmissions}
              </h3>
              <span className="rtl:mr-auto ltr:ml-auto bg-[#0B1E36] text-white text-xs px-2.5 py-0.5 rounded-full font-mono">
                {ownSuggestions.length}
              </span>
            </div>

            {ownSuggestions.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="text-sm text-gray-500 font-medium font-vazir">
                  {t.noSuggestions}
                </p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-normal">
                  {lang === 'en' 
                    ? 'Your past feedback from this browser session will appear here.' 
                    : 'بازخوردهای قبلی شما در این مرورگر در اینجا نمایش داده خواهند شد.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {ownSuggestions.map((item) => (
                  <div 
                    key={item.id}
                    className="group border border-gray-100 rounded-xl p-4 bg-gray-50/30 hover:bg-white hover:shadow-md hover:border-[#C9A87C]/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {/* ID tag */}
                        <span className="inline-flex items-center gap-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-mono text-gray-600">
                          <Hash className="h-3 w-3 text-gray-400" />
                          {item.id}
                        </span>

                        {/* Category tag */}
                        <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold font-vazir ${getCategoryStyle(item.category)}`}>
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>

                      {/* Status badge */}
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.status === 'Reviewed' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {item.status === 'Reviewed' ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>{t.reviewed}</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 shrink-0 animate-pulse" />
                            <span>{t.pending}</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Subject */}
                    <h4 className="font-bold text-gray-900 text-sm mb-1 font-vazir line-clamp-1 group-hover:text-[#0B1E36] transition-colors">
                      {item.subject}
                    </h4>

                    {/* Main content snippet/text */}
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3 whitespace-pre-line font-vazir">
                      {item.text}
                    </p>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                      <Clock className="h-3 w-3" />
                      <span>{item.timestamp}</span>
                    </div>

                    {/* Admin Response section */}
                    {item.adminResponse && (
                      <div className="mt-3 p-3 bg-emerald-50/40 border border-emerald-100/60 rounded-lg text-xs space-y-1">
                        <p className="font-bold text-emerald-800 font-vazir flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          {t.adminResponse}
                        </p>
                        <p className="text-gray-700 leading-relaxed font-vazir">
                          {item.adminResponse}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
