'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '48px 24px',
            gap: 16,
          }}
        >
          <p style={{ fontSize: '3.5rem', fontWeight: 500, lineHeight: 1, margin: 0 }}>Error</p>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>
            Something went wrong while rendering this page
          </h1>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
            style={{ marginTop: 8 }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
