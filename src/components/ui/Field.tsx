import React, { useId } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

interface FieldShellProps {
  label: string;
  /** Helper text under the control. */
  hint?: React.ReactNode;
  /** Error message. Sets aria-invalid and replaces the hint. */
  error?: React.ReactNode;
  className?: string;
}

function useFieldIds(id?: string) {
  const auto = useId();
  const controlId = id ?? auto;
  return { controlId, messageId: `${controlId}-message` };
}

function Message({ id, hint, error }: { id: string; hint?: React.ReactNode; error?: React.ReactNode }) {
  if (error)
    return (
      <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
        <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden />
        <span>{error}</span>
      </p>
    );
  if (hint)
    return (
      <p id={id} className="mt-2 text-sm text-fg-subtle">
        {hint}
      </p>
    );
  return null;
}

export type InputProps = FieldShellProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder">;

/** Text input with a floating label and inline error state. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const { controlId, messageId } = useFieldIds(id);
  return (
    <div className={cn("ds-field", className)} data-invalid={!!error}>
      <input
        ref={ref}
        id={controlId}
        // The placeholder is a single space so :placeholder-shown can drive
        // the floating label. It is never visible.
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className="ds-control"
        {...rest}
      />
      <label htmlFor={controlId} className="ds-label">
        {label}
        {rest.required && <span aria-hidden className="text-fg-subtle"> *</span>}
      </label>
      <Message id={messageId} hint={hint} error={error} />
    </div>
  );
});

export type TextareaProps = FieldShellProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder">;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const { controlId, messageId } = useFieldIds(id);
  return (
    <div className={cn("ds-field", className)} data-invalid={!!error}>
      <textarea
        ref={ref}
        id={controlId}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className="ds-control"
        {...rest}
      />
      <label htmlFor={controlId} className="ds-label">
        {label}
        {rest.required && <span aria-hidden className="text-fg-subtle"> *</span>}
      </label>
      <Message id={messageId} hint={hint} error={error} />
    </div>
  );
});

export type SelectProps = FieldShellProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
    /** Optional empty first option, e.g. "Choose one". */
    placeholderOption?: string;
  };

/** Native select (best on mobile and for assistive tech), styled to match. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, className, id, options, placeholderOption, ...rest },
  ref,
) {
  const { controlId, messageId } = useFieldIds(id);
  return (
    <div className={cn("ds-field", className)} data-invalid={!!error}>
      <select
        ref={ref}
        id={controlId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className="ds-control"
        {...rest}
      >
        {placeholderOption !== undefined && <option value="">{placeholderOption}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label htmlFor={controlId} className="ds-label">
        {label}
        {rest.required && <span aria-hidden className="text-fg-subtle"> *</span>}
      </label>
      <ChevronDown
        size={18}
        aria-hidden
        className="pointer-events-none absolute top-[1.125rem] right-3.5 text-fg-muted"
      />
      <Message id={messageId} hint={hint} error={error} />
    </div>
  );
});
