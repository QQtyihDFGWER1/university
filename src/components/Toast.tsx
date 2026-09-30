/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Language } from '../types';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  lang: Language;
}

export default function Toast({ message, type, onClose, lang }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isRtl = lang === 'fa';

  const styles = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-800',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 dark:border-rose-800',
      text: 'text-rose-800',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
    },
    info: {
      bg: 'bg-amber-50 border-amber-200 dark:border-amber-800',
      text: 'text-amber-800',
      icon: <Info className="w-5 h-5 text-amber-600" />,
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`fixed bottom-5 ${
        isRtl ? 'left-5' : 'right-5'
      } z-50 flex items-center p-4 mb-4 w-full max-w-md border rounded-xl shadow-lg animate-bounce-short ${currentStyle.bg} transition-all duration-300`}
      role="alert"
    >
      <div className={`inline-flex items-center justify-center flex-shrink-0`}>
        {currentStyle.icon}
      </div>
      <div className={`mx-3 text-sm font-medium ${currentStyle.text} flex-grow`}>
        {message}
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300`}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
