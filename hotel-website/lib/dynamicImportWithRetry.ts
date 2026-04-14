"use client";

const CHUNK_ERROR_PATTERN =
  /ChunkLoadError|Failed to fetch dynamically imported module|Loading chunk [\w/-]+ failed/i;

function shouldRetryChunk(error: unknown): boolean {
  return error instanceof Error && CHUNK_ERROR_PATTERN.test(error.message);
}

export function dynamicImportWithRetry<T>(
  importer: () => Promise<T>,
  cacheKey: string,
): () => Promise<T> {
  return async () => {
    try {
      const module = await importer();

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(`dynamic-import-retry:${cacheKey}`);
      }

      return module;
    } catch (error) {
      if (typeof window !== "undefined" && shouldRetryChunk(error)) {
        const retryKey = `dynamic-import-retry:${cacheKey}`;
        const alreadyRetried = window.sessionStorage.getItem(retryKey) === "1";

        if (!alreadyRetried) {
          window.sessionStorage.setItem(retryKey, "1");
          window.location.reload();

          // Keep the promise pending while the page refreshes.
          return new Promise<T>(() => undefined);
        }

        window.sessionStorage.removeItem(retryKey);
      }

      throw error;
    }
  };
}
