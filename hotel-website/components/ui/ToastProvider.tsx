"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type ToastTone = "error" | "success" | "info";

type ToastItem = {
  id: string;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  pushToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function createToastId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutIds = useRef<Map<string, number>>(new Map());

  const dismissToast = useCallback((id: string) => {
    const timeoutId = timeoutIds.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutIds.current.delete(id);
    }
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback((message: string, tone: ToastTone = "error") => {
    const id = createToastId();
    setToasts((current) => [...current, { id, message, tone }].slice(-4));
    const timeoutId = window.setTimeout(() => dismissToast(id), 4200);
    timeoutIds.current.set(id, timeoutId);
  }, [dismissToast]);

  const value = useMemo<ToastContextValue>(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[90] flex justify-center px-4">
        <div className="flex w-full max-w-xl flex-col gap-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="status"
              aria-live="polite"
              className={`pointer-events-auto rounded-[1.35rem] border px-5 py-4 shadow-[0_18px_40px_rgba(15,25,32,0.18)] backdrop-blur-md transition ${
                toast.tone === "error"
                  ? "border-[#c49a3c]/25 bg-[#143b47]/94 text-white"
                  : toast.tone === "success"
                    ? "border-[#c49a3c]/25 bg-[#173f38]/94 text-white"
                    : "border-white/14 bg-[#1d2d35]/94 text-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#c49a3c]" />
                <p className="flex-1 text-sm leading-6 text-white/92">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65 transition hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
