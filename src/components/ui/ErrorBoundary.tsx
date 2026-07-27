import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ExclamationTriangleIcon className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Something went wrong
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
              >
                <ArrowPathIcon className="w-4 h-4" />
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
