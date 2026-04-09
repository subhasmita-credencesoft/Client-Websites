"use client";

import { useCallback } from "react";
import { useToast } from "@/components/ui/ToastProvider";

function normalizeError(error: unknown, fallbackMessage: string) {
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallbackMessage;
}

export default function useErrorHandler() {
  const { pushToast } = useToast();

  const toUserMessage = useCallback((error: unknown, fallbackMessage: string) => {
    return normalizeError(error, fallbackMessage);
  }, []);

  const logError = useCallback((context: string, error: unknown) => {
    console.error(context, error);
  }, []);

  const notifyError = useCallback((error: unknown, fallbackMessage: string) => {
    const message = normalizeError(error, fallbackMessage);
    pushToast(message, "error");
    return message;
  }, [pushToast]);

  return { toUserMessage, logError, notifyError };
}
