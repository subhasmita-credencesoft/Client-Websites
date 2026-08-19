import { useId } from 'react';
import styles from './TextField.module.scss';

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

/**
 * TextField
 * States implemented: default, hover (browser-native + custom border), focus-visible,
 * active (typing), disabled, error. "Loading" is not applicable to a text input and is
 * intentionally omitted; form-level loading is communicated on the submit Button.
 */
export function TextField({
  label,
  name,
  error,
  hint,
  required = false,
  multiline = false,
  rows = 5,
  type = 'text',
  placeholder,
  defaultValue,
  className,
}: BaseProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const fieldClasses = [styles.field, error ? styles.fieldError : ''].filter(Boolean).join(' ');

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`.trim()}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      )}

      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
