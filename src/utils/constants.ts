export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const ENDPOINTS = {
  REPORTS: '/reports',
  USER: '/user',
  PRACTICE: '/practice',
  ANALYTICS: '/analytics'
};

export const APP_CONFIG = {
  APP_NAME: 'YENI AI',
  VERSION: '1.0.0'
};