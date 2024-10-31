import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ToastOptions {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<ToastOptions | null>(null);

  const toast = (options: ToastOptions) => {
    setMessage(options);
    setTimeout(() => setMessage(null), 5000); // Dismiss after 5 seconds
  };

  return (
    <ToastContext.Provider value={{ toast }}>
    {children}
    {message && (
      <div className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
        <div className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-slate-200 p-6 pr-8 shadow-lg transition-transform transform duration-300 ease-in-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full bg-white dark:border-slate-800 dark:bg-black">
          <div className="grid gap-1">
            {message.title && (
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {message.title}
              </div>
            )}
            {message.description && (
              <div className="text-sm opacity-90 text-slate-500 dark:text-slate-400">
                {message.description}
              </div>
            )}
          </div>
          {message.action && <div className="mt-2">{message.action}</div>}
          <button
            onClick={() => setMessage(null)}
            className="absolute right-2 top-2 rounded-md p-1 text-slate-500 opacity-0 transition-opacity hover:text-slate-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-slate-400 dark:hover:text-slate-50"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    )}
  </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};