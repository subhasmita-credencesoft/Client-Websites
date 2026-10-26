'use client';

import { useState } from 'react';
import type { ApiResponse } from '@/types';

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/** Shared submit logic for both forms: POSTs, tracks status, surfaces server-side field errors. */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(init: { body: BodyInit; headers?: HeadersInit }, onSuccess: () => void) {
    setStatus('sending');
    setMessage('');
    setErrors({});
    try {
      const res = await fetch(endpoint, { method: 'POST', ...init });
      const json = (await res.json()) as ApiResponse;
      if (res.ok && json.ok) {
        setStatus('success');
        setMessage(json.message ?? 'Thank you! Your submission has been received.');
        onSuccess();
      } else {
        setStatus('error');
        setErrors(json.errors ?? {});
        setMessage(json.message ?? 'Please check the highlighted fields and try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }

  return { status, message, errors, submit };
}
