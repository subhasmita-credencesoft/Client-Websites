import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { InputVariant } from "@/types";

type BaseInputProps = {
  variant?: InputVariant;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & BaseInputProps;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseInputProps;

function inputClassName(variant: InputVariant, className?: string) {
  return cn("site-input", variant === "error" && "site-input-error", className);
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = "default", className, ...props },
  ref,
) {
  return <input ref={ref} className={inputClassName(variant, className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant = "default", className, ...props },
  ref,
) {
  return <textarea ref={ref} className={inputClassName(variant, cn("min-h-32 resize-y", className))} {...props} />;
});
