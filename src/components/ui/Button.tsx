import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-brand " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
  "motion-reduce:transform-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg rounded-control " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(11,17,26,0.14)] " +
    "hover:-translate-y-px hover:bg-accent-hover " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_30px_-8px_var(--accent-glow)] " +
    "active:translate-y-0",
  secondary:
    "bg-bg-raised text-fg rounded-control border border-border-strong shadow-elev-1 " +
    "hover:-translate-y-px hover:border-fg-subtle active:translate-y-0",
  ghost: "text-fg rounded-control hover:bg-fg/[0.06]",
  link: "text-accent-text underline-offset-4 decoration-1 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon before the label. */
  iconLeft?: React.ReactNode;
  /**
   * Icon after the label; nudges 2px on hover. Pass `true` for the default
   * arrow, or `false` to omit it.
   */
  iconRight?: React.ReactNode | boolean;
  /** The single main CTA glow (signature gradient). Use once per view. */
  signature?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    to?: undefined;
    href?: undefined;
  };
type AsRouterLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    /** Internal route — renders a react-router <Link>. */
    to: string;
    href?: undefined;
  };
type AsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    /** External / mailto URL — renders a plain <a>. */
    href: string;
    to?: undefined;
  };

export type ButtonProps = AsButton | AsRouterLink | AsAnchor;

export function buttonClasses({
  variant = "primary",
  size = "md",
  signature,
  className,
}: Pick<CommonProps, "variant" | "size" | "signature" | "className">) {
  return cn(
    base,
    variants[variant],
    variant !== "link" && sizes[size],
    variant === "link" && "h-auto p-0",
    signature && "ds-btn-signature",
    className,
  );
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight = false,
    signature,
    className,
    children,
    ...rest
  } = props;

  const classes = buttonClasses({ variant, size, signature, className });
  const trailing =
    iconRight === true ? <ArrowRight size={size === "sm" ? 15 : 17} /> : iconRight || null;
  const content = (
    <>
      {iconLeft && (
        <span aria-hidden className="inline-flex shrink-0">
          {iconLeft}
        </span>
      )}
      {children}
      {trailing && (
        <span
          aria-hidden
          className="inline-flex shrink-0 transition-transform duration-200 ease-brand group-hover:translate-x-0.5 motion-reduce:transform-none"
        >
          {trailing}
        </span>
      )}
    </>
  );

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...anchor } = rest as AsRouterLink;
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} className={classes} {...anchor}>
        {content}
      </Link>
    );
  }
  if ("href" in rest && rest.href !== undefined) {
    const anchor = rest as AsAnchor;
    const external = /^https?:/.test(anchor.href);
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...anchor}
      >
        {content}
      </a>
    );
  }
  const button = rest as AsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={button.type ?? "button"}
      className={classes}
      {...button}
    >
      {content}
    </button>
  );
});
