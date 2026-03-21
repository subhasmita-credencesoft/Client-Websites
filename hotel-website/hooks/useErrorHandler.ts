"use client";

import { useCallback } from "react";

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
  const toUserMessage = useCallback((error: unknown, fallbackMessage: string) => {
    return normalizeError(error, fallbackMessage);
  }, []);

  const logError = useCallback((context: string, error: unknown) => {
    console.error(context, error);
  }, []);

  return { toUserMessage, logError };
}
