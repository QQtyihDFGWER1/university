/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle, 
  Trash2, 
  Search, 
  Filter, 
  Inbox, 
  Clock, 
  BarChart2, 
  CheckCircle2, 
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Hash,
  Eye
} from 'lucide-react';
import { Suggestion, Language, TranslationSet } from '../types';

interface AdminPortalProps {
  lang: Language;
  suggestions: Suggestion[];
  onMarkReviewed: (id: string) => void;
  onDeleteSuggestion: (id: string) => void;
  onUpdateResponse: (id: string, responseText: string) => void;
  t: TranslationSet;
}

export default function AdminPortal({ lang, suggestions, onMarkReviewed, onDeleteSuggestion, onUpdateResponse, t }: AdminPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Reviewed'>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [responseDrafts, setResponseDrafts] = useState<Record<string, string>>({});
  
  // Modal for confirming deletion
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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
      case 'educational': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'welfare': return 'bg-purple-50 text-purple-700 border border-purple-100';
      case 'cultural': return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'administrative': return 'bg-teal-50 text-teal-700 border border-teal-100';
      default: return 'bg-gray-50 text-gray-700 border border-gray-100';
    }
  };

  // Stats calculators
  const totalCount = suggestions.length;
  const pendingCount = suggestions.filter(s => s.status === 'Pending').length;
  const reviewedCount = suggestions.filter(s => s.status === 'Reviewed').length;

  // Toggle text expansion for long suggestions
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter and search suggestions
  const filteredSuggestions = suggestions.filter(item => {
    const matchesTab = 
      filterTab === 'All' || 
      (filterTab === 'Pending' && item.status === 'Pending') || 
      (filterTab === 'Reviewed' && item.status === 'Reviewed');

    const normalizedQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !normalizedQuery || 
      item.subject.toLowerCase().includes(normalizedQuery) || 
      item.text.toLowerCase().includes(normalizedQuery) || 
      item.id.toLowerCase().includes(normalizedQuery);

    return matchesTab && matchesSearch;
  });

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      onDeleteSuggestion(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="w-full space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dashboard Introduction Header */}
      <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E36] font-vazir flex items-center gap-2">
          <span className="text-[#C9A87C]">✦</span> {t.adminDashboardTitle}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          {t.adminDashboardSub}
        </p>
      </div>

      {/* Summary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Submissions Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex items-center justify-between group hover:border-[#C9A87C]/60 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 font-inter tracking-wider uppercase block">
              {t.total}
            </span>
            <span className="text-3xl font-bold text-[#0B1E36] font-mono">
              {totalCount}
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#0B1E36]/5 flex items-center justify-center text-[#0B1E36] group-hover:scale-110 transition-transform duration-300">
            <BarChart2 className="h-6 w-6" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#0B1E36]" />
        </div>

        {/* Pending Submissions Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex items-center justify-between group hover:border-amber-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 font-inter tracking-wider uppercase block">
              {t.awaitingReview}
            </span>
            <span className="text-3xl font-bold text-amber-600 font-mono">
              {pendingCount}
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-300">
            <Clock className="h-6 w-6" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-500" />
        </div>

        {/* Reviewed Submissions Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex items-center justify-between group hover:border-emerald-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 font-inter tracking-wider uppercase block">
              {t.statsReviewed}
            </span>
            <span className="text-3xl font-bold text-emerald-600 font-mono">
              {reviewedCount}
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-500" />
        </div>
      </div>

      {/* Main Table & Filter Controls Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Table Filters & Keywords Search Bar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/50">
          
          {/* Status Segmented Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto self-stretch md:self-auto shrink-0">
            <button
              onClick={() => setFilterTab('All')}
              className={`flex-1 md:flex-none text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                filterTab === 'All'
                  ? 'bg-white text-[#0B1E36] shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setFilterTab('Pending')}
              className={`flex-1 md:flex-none text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                filterTab === 'Pending'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.filterPending}
            </button>
            <button
              onClick={() => setFilterTab('Reviewed')}
              className={`flex-1 md:flex-none text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                filterTab === 'Reviewed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.filterReviewed}
            </button>
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:max-w-md">
            <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`block w-full ${isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2.5 border border-gray-200 bg-white rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A87C] focus:border-[#C9A87C] transition-all font-vazir`}
            />
          </div>
        </div>

        {/* Submissions List / Table */}
        {filteredSuggestions.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
              <Inbox className="h-8 w-8" />
            </div>
            <p className="text-lg font-bold text-gray-900 font-vazir">
              {t.noSuggestions}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-normal">
              {lang === 'en' 
                ? 'No items match your selected filters or search terms.' 
                : 'هیچ موردی منطبق با فیلترها یا جستجوی شما یافت نشد.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-initial border-collapse">
              <thead>
                <tr className="bg-[#0B1E36]/5 text-[#0B1E36] border-b border-gray-100">
                  <th className={`px-6 py-4 text-xs font-bold tracking-wider uppercase text-center w-24 font-inter`}>
                    {t.idCol}
                  </th>
                  <th className={`px-6 py-4 text-xs font-bold tracking-wider uppercase ${isRtl ? 'text-right' : 'text-left'} w-44 font-vazir`}>
                    {t.dateCol}
                  </th>
                  <th className={`px-6 py-4 text-xs font-bold tracking-wider uppercase ${isRtl ? 'text-right' : 'text-left'} w-64 font-vazir`}>
                    {t.subjectCol}
                  </th>
                  <th className={`px-6 py-4 text-xs font-bold tracking-wider uppercase ${isRtl ? 'text-right' : 'text-left'} w-44 font-vazir`}>
                    {t.categoryCol}
                  </th>
                  <th className={`px-6 py-4 text-xs font-bold tracking-wider uppercase ${isRtl ? 'text-right' : 'text-left'} font-vazir`}>
                    {t.contentCol}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-center w-36 font-vazir">
                    {t.statusCol}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-center w-48 font-vazir">
                    {t.actionsCol}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSuggestions.map((item) => {
                  const isExpanded = expandedIds[item.id] || false;
                  const isLongText = item.text.length > 140;

                  return (
                    <tr 
                      key={item.id} 
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* ID column */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center gap-0.5 rounded bg-[#0B1E36]/5 px-2 py-1 text-xs font-mono font-bold text-[#0B1E36]">
                          <Hash className="h-3 w-3 text-gray-400" />
                          {item.id}
                        </span>
                      </td>

                      {/* Timestamp column */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {item.timestamp}
                      </td>

                      {/* Subject column */}
                      <td className="px-6 py-4 font-bold text-[#0B1E36] font-vazir text-sm max-w-xs truncate">
                        {item.subject}
                      </td>

                      {/* Category cell */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold font-vazir ${getCategoryStyle(item.category)}`}>
                          {getCategoryLabel(item.category)}
                        </span>
                      </td>

                      {/* Full text details column */}
                      <td className="px-6 py-4 font-vazir">
                        <div className="max-w-lg space-y-1.5">
                          <p className={`text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {item.text}
                          </p>
                          {isLongText && (
                            <button
                              onClick={() => toggleExpand(item.id)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A87C] hover:text-[#0B1E36] transition-colors focus:outline-none cursor-pointer"
                            >
                              {isExpanded ? (
                                <>
                                  <span>{lang === 'en' ? 'Show Less' : 'نمایش کمتر'}</span>
                                  <ChevronUp className="h-3.5 w-3.5" />
                                </>
                              ) : (
                                <>
                                  <span>{lang === 'en' ? 'Read Full Text' : 'نمایش کامل متن'}</span>
                                  <ChevronDown className="h-3.5 w-3.5" />
                                </>
                              )}
                            </button>
                          )}

                          {/* Admin Response section */}
                          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-500 font-vazir">
                                {t.adminResponse}
                              </span>
                              {item.adminResponse && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full font-vazir">
                                  {lang === 'en' ? 'Response Saved' : 'پاسخ ثبت شده'}
                                </span>
                              )}
                            </div>

                            {item.adminResponse && responseDrafts[item.id] === undefined ? (
                              <div className="p-3 bg-emerald-50/40 rounded-lg text-xs leading-relaxed text-gray-700 border border-emerald-100/60 font-vazir relative group">
                                <p>{item.adminResponse}</p>
                                <button
                                  onClick={() => {
                                    setResponseDrafts(prev => ({ ...prev, [item.id]: item.adminResponse || '' }));
                                  }}
                                  className="mt-2 text-[10px] font-bold text-[#C9A87C] hover:underline cursor-pointer inline-block"
                                >
                                  {lang === 'en' ? 'Edit Response' : 'ویرایش پاسخ'}
                                </button>
                              </div>
                            ) : null}

                            {(!item.adminResponse || responseDrafts[item.id] !== undefined) && (
                              <div className="space-y-2">
                                <textarea
                                  rows={2}
                                  value={responseDrafts[item.id] ?? ''}
                                  onChange={(e) => setResponseDrafts(prev => ({ ...prev, [item.id]: e.target.value }))}
                                  placeholder={t.responsePlaceholder}
                                  className="block w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9A87C] focus:border-[#C9A87C] bg-white text-gray-800 resize-none font-vazir leading-relaxed"
                                />
                                <div className="flex gap-2 justify-end">
                                  {responseDrafts[item.id] !== undefined && item.adminResponse && (
                                    <button
                                      onClick={() => {
                                        setResponseDrafts(prev => {
                                          const next = { ...prev };
                                          delete next[item.id];
                                          return next;
                                        });
                                      }}
                                      className="px-3 py-1 text-[10px] font-bold text-gray-500 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                      {t.cancel}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      const text = responseDrafts[item.id] || '';
                                      onUpdateResponse(item.id, text);
                                      setResponseDrafts(prev => {
                                        const next = { ...prev };
                                        delete next[item.id];
                                        return next;
                                      });
                                    }}
                                    className="px-3 py-1 text-[10px] font-bold text-white bg-[#0B1E36] rounded hover:bg-[#C9A87C] transition-colors cursor-pointer"
                                  >
                                    {t.saveResponse}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status badge column */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
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
                              <Clock className="h-3 w-3 shrink-0" />
                              <span>{t.pending}</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Actions Buttons column */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="inline-flex gap-2">
                          {/* Mark as Reviewed Button */}
                          <button
                            onClick={() => onMarkReviewed(item.id)}
                            disabled={item.status === 'Reviewed'}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm transition-all border ${
                              item.status === 'Reviewed'
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white cursor-pointer'
                            }`}
                            title={t.markReviewed}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{t.markReviewed}</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-600 hover:text-white shadow-sm transition-all cursor-pointer"
                            title={t.delete}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{t.delete}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Elegant Deletion Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div 
            className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-vazir">
                  {t.confirmDelete}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-vazir">
                {t.confirmDeleteText}
              </p>
              <div className="text-xs font-mono text-gray-400 bg-gray-50 p-2 rounded border border-gray-100">
                ID: {confirmDeleteId}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-rose-700 shadow-sm transition-colors"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
