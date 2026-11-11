import React from 'react';
import { BUSINESS } from '../data/content';

interface State {
  hasError: boolean;
}

/**
 * Last-resort fallback so a runtime error shows a friendly message (with the
 * phone number, so guests can still reach the restaurant) instead of a blank page.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    // Surfaces in the browser console (and any monitoring that captures console errors).
    console.error('Unhandled render error', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF7] px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-extrabold text-stone-900 mb-3">Sorry, something went wrong</h1>
          <p className="text-stone-600 text-sm mb-6">
            Please reload the page. If it keeps happening, call us on{' '}
            <a href={`tel:${BUSINESS.phoneIntl.replace(/\s/g, '')}`} className="font-bold text-[#D9531E]">
              {BUSINESS.phoneDisplay}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
