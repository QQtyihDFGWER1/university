/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Suggestion {
  id: string;
  timestamp: string;
  subject: string;
  text: string;
  status: 'Pending' | 'Reviewed';
  category: 'educational' | 'welfare' | 'cultural' | 'administrative';
  adminResponse?: string;
}

export type Language = 'en' | 'fa';

export type UserRole = 'student' | 'admin' | null;

export interface TranslationSet {
  appTitle: string;
  brandName: string;
  brandSub: string;
  studentPortal: string;
  adminPortal: string;
  enterPass: string;
  loginBtn: string;
  passwordPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  suggestion: string;
  suggestionPlaceholder: string;
  submitBtn: string;
  logout: string;
  pending: string;
  reviewed: string;
  markReviewed: string;
  delete: string;
  total: string;
  awaitingReview: string;
  noSuggestions: string;
  wrongPass: string;
  submitSuccess: string;
  studentViewTitle: string;
  studentViewSub: string;
  yourSubmissions: string;
  adminDashboardTitle: string;
  adminDashboardSub: string;
  idCol: string;
  dateCol: string;
  subjectCol: string;
  contentCol: string;
  statusCol: string;
  actionsCol: string;
  backToHome: string;
  allRightsReserved: string;
  quickNote: string;
  quickNoteText: string;
  confirmDelete: string;
  confirmDeleteText: string;
  cancel: string;
  searchPlaceholder: string;
  filterAll: string;
  filterPending: string;
  filterReviewed: string;
  loading: string;
  studentPassHint: string;
  adminPassHint: string;
  statsReviewed: string;
  category: string;
  categoryCol: string;
  adminResponse: string;
  writeResponse: string;
  responsePlaceholder: string;
  saveResponse: string;
  responseSaved: string;
  catEducational: string;
  catWelfare: string;
  catCultural: string;
  catAdministrative: string;
}

