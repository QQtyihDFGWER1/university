/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Suggestion, Language, UserRole } from './types';
import { translations } from './translations';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPortal from './components/LoginPortal';
import StudentPortal from './components/StudentPortal';
import AdminPortal from './components/AdminPortal';
import Toast from './components/Toast';
import { GraduationCap, ShieldCheck, HelpCircle } from 'lucide-react';

// Pre-seeded academic feedback data to ensure administrative dashboard is rich on initial load
const PRE_SEEDED_SUGGESTIONS: Suggestion[] = [
  {
    id: "DP-2026-X83B",
    timestamp: "2026/07/16 14:32:10",
    subject: "24/7 Library Access during Exams",
    text: "It would be incredibly helpful if the central library remained open 24 hours during final exam weeks. Currently, it closes at 9 PM, which is too early for late-night study sessions and group projects.",
    status: "Pending",
    category: "educational"
  },
  {
    id: "DP-2026-R41A",
    timestamp: "2026/07/15 11:20:05",
    subject: "Vegetarian Meals in Main Refectory",
    text: "Could the university please offer more vegetarian and vegan options in the student cafeteria? Right now, almost all hot meals contain meat, which leaves limited choices for students on plant-based diets.",
    status: "Reviewed",
    category: "welfare",
    adminResponse: "The cafeteria committee has met and agreed to introduce a fresh salad bar and at least one daily hot plant-based meal starting next academic semester."
  },
  {
    id: "DP-2026-N29F",
    timestamp: "1405/04/27 18:15:30",
    subject: "سرعت اینترنت و وای‌فای خوابگاه دانشجویی",
    text: "سرعت اینترنت وای‌فای در خوابگاه دانشجویی دانشگاه فرهنگیان واحد دانشور نیشابور بسیار پایین است و شب‌ها با قطعی مکرر مواجه می‌شویم. برای انجام پژوهش‌ها، دانلود مقالات علمی و شرکت در کلاس‌های مجازی با چالش بزرگی روبرو هستیم. خواهشمندیم پهنای باند خوابگاه را افزایش دهید.",
    status: "Pending",
    category: "welfare"
  },
  {
    id: "DP-2026-Q18D",
    timestamp: "1405/04/26 09:40:12",
    subject: "تجهیزات آزمایشگاه مهندسی برق",
    text: "دستگاه‌های آزمایشگاه مدار برق نیاز مبرم به نوسازی و کالیبراسیون دارند. بعضی از اسیلوسکوپ‌ها و مولتی‌مترها به درستی کار نمی‌کنند که باعث ثبت داده‌های اشتباه در گزارش کارها می‌شود.",
    status: "Reviewed",
    category: "educational",
    adminResponse: "تجهیزات آزمایشگاه بررسی شد و ۳ دستگاه اسیلوسکوپ جدید خریداری شده که تا پایان ماه جاری کالیبره و نصب خواهند شد."
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('fa'); // Persian by default to show off Vazirmatn and Daneshvar Pouya brand!
  const [role, setRole] = useState<UserRole>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [ownSuggestionIds, setOwnSuggestionIds] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load configuration and data from localStorage on mount
  useEffect(() => {
    // Check if suggestions already exist in localStorage
    const storedSuggestions = localStorage.getItem('daneshvar_all_suggestions');
    if (storedSuggestions) {
      setSuggestions(JSON.parse(storedSuggestions));
    } else {
      // Seed suggestions on first run
      setSuggestions(PRE_SEEDED_SUGGESTIONS);
      localStorage.setItem('daneshvar_all_suggestions', JSON.stringify(PRE_SEEDED_SUGGESTIONS));
    }

    // Check if student's own suggestion IDs exist
    const storedOwnIds = localStorage.getItem('daneshvar_student_own_ids');
    if (storedOwnIds) {
      setOwnSuggestionIds(JSON.parse(storedOwnIds));
    } else {
      // Students start with a completely empty list to guarantee they only see their own submissions
      const initialOwnIds: string[] = [];
      setOwnSuggestionIds(initialOwnIds);
      localStorage.setItem('daneshvar_student_own_ids', JSON.stringify(initialOwnIds));
    }

    // Retrieve active language if previously saved
    const savedLang = localStorage.getItem('daneshvar_lang');
    if (savedLang === 'en' || savedLang === 'fa') {
      setLang(savedLang as Language);
    }
  }, []);

  // Translations shortcut
  const t = translations[lang];

  // Language toggle handler
  const handleLanguageToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const newLang = lang === 'en' ? 'fa' : 'en';
      setLang(newLang);
      localStorage.setItem('daneshvar_lang', newLang);
      setIsTransitioning(false);
    }, 450);
  };

  // Login handler
  const handleLoginSuccess = (userRole: UserRole) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setRole(userRole);
      setIsTransitioning(false);
    }, 500);
  };

  // Logout handler
  const handleLogout = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setRole(null);
      setIsTransitioning(false);
      showToast(lang === 'en' ? 'Logged out successfully.' : 'خروج با موفقیت انجام شد.', 'info');
    }, 450);
  };

  // Submit feedback suggestion (Student)
  const handleAddSuggestion = (subject: string, text: string, category: 'educational' | 'welfare' | 'cultural' | 'administrative') => {
    const newId = `DP-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    // Create highly professional timestamp depending on language selection
    const now = new Date();
    let timestamp = '';
    
    if (lang === 'fa') {
      // Format Solar Hijri date beautifully or use standard formatted fa-IR date
      timestamp = now.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) + ' ' + now.toLocaleTimeString('fa-IR', { hour12: false });
    } else {
      timestamp = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) + ' ' + now.toLocaleTimeString('en-US', { hour12: false });
    }

    const newSuggestion: Suggestion = {
      id: newId,
      timestamp,
      subject,
      text,
      status: 'Pending',
      category
    };

    // Save to global suggestions list (prepend for latest first)
    const updatedAll = [newSuggestion, ...suggestions];
    setSuggestions(updatedAll);
    localStorage.setItem('daneshvar_all_suggestions', JSON.stringify(updatedAll));

    // Save to student's own ID references
    const updatedOwn = [newId, ...ownSuggestionIds];
    setOwnSuggestionIds(updatedOwn);
    localStorage.setItem('daneshvar_student_own_ids', JSON.stringify(updatedOwn));

    // Display success notification
    showToast(t.submitSuccess, 'success');
  };

  // Mark suggestion as Reviewed (Admin)
  const handleMarkReviewed = (id: string) => {
    const updatedAll = suggestions.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Reviewed' as const };
      }
      return item;
    });

    setSuggestions(updatedAll);
    localStorage.setItem('daneshvar_all_suggestions', JSON.stringify(updatedAll));
    showToast(
      lang === 'en' ? 'Submission status updated to Reviewed.' : 'وضعیت بازخورد به بررسی شده تغییر یافت.', 
      'success'
    );
  };

  // Delete suggestion entirely (Admin)
  const handleDeleteSuggestion = (id: string) => {
    const updatedAll = suggestions.filter(item => item.id !== id);
    setSuggestions(updatedAll);
    localStorage.setItem('daneshvar_all_suggestions', JSON.stringify(updatedAll));

    // Also remove from student own list if it was theirs
    const updatedOwn = ownSuggestionIds.filter(ownId => ownId !== id);
    setOwnSuggestionIds(updatedOwn);
    localStorage.setItem('daneshvar_student_own_ids', JSON.stringify(updatedOwn));

    showToast(
      lang === 'en' ? 'Submission deleted permanently.' : 'بازخورد با موفقیت برای همیشه حذف شد.', 
      'info'
    );
  };

  // Update administrative response (Admin)
  const handleUpdateResponse = (id: string, responseText: string) => {
    const updatedAll = suggestions.map(item => {
      if (item.id === id) {
        return { ...item, adminResponse: responseText.trim() || undefined };
      }
      return item;
    });

    setSuggestions(updatedAll);
    localStorage.setItem('daneshvar_all_suggestions', JSON.stringify(updatedAll));
    showToast(t.responseSaved, 'success');
  };

  // Toast triggers
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // Derived state: student's own suggestions objects filtered from global list
  const studentOwnSuggestions = suggestions.filter(item => ownSuggestionIds.includes(item.id));

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-300 ${
        lang === 'en' ? 'font-inter' : 'font-vazir'
      }`}
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Header */}
      <Header 
        lang={lang} 
        onLanguageToggle={handleLanguageToggle} 
        role={role} 
        onLogout={handleLogout}
        t={t}
      />

      {/* Main Container Area */}
      <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        {isTransitioning ? (
          /* High-end loading animation for academic switching */
          <div className="flex flex-col items-center justify-center min-h-[50vh] py-20">
            <div className="relative flex items-center justify-center h-16 w-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#C9A87C] border-r-transparent border-b-transparent border-l-transparent"></div>
              <GraduationCap className="absolute h-6 w-6 text-[#0B1E36]" />
            </div>
            <p className="text-sm font-bold text-[#0B1E36] font-vazir animate-pulse">
              {t.loading}
            </p>
          </div>
        ) : (
          <div className="fade-enter fade-enter-active">
            {role === null ? (
              /* Portal Entry Selection & Password Card */
              <div className="py-8 sm:py-12">
                <LoginPortal 
                  lang={lang} 
                  onLoginSuccess={handleLoginSuccess} 
                  onShowToast={showToast}
                  t={t}
                />
              </div>
            ) : role === 'student' ? (
              /* Student Anonymous Feedback Form & Past list */
              <StudentPortal 
                lang={lang} 
                ownSuggestions={studentOwnSuggestions} 
                onAddSuggestion={handleAddSuggestion}
                t={t}
              />
            ) : (
              /* Administrative Dashboard for review & actions */
              <AdminPortal 
                lang={lang} 
                suggestions={suggestions} 
                onMarkReviewed={handleMarkReviewed} 
                onDeleteSuggestion={handleDeleteSuggestion}
                onUpdateResponse={handleUpdateResponse}
                t={t}
              />
            )}
          </div>
        )}
      </main>

      {/* Elegant Academic Footer */}
      <Footer lang={lang} t={t} />

      {/* Custom Sliding Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={handleCloseToast} 
          lang={lang}
        />
      )}
    </div>
  );
}
