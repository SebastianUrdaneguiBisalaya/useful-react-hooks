import { cn } from "@/lib/cn";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'w-fit font-reddit-sans text-sm transition-colors duration-500 ease-in-out px-4 py-1.5 rounded-lg cursor-pointer focus:outline-none',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
);

BaseButton.displayName = 'Button';

const Primary = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        className={cn(
          'bg-white-100 border border-transparent text-neutral-900',
          props.className
        )}
      />
    )
  }
);

Primary.displayName = 'Button.Primary';

const Secondary = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        className={cn(
          'bg-neutral-900 hover:bg-neutral-800 border border-white/20 text-white/70 hover:text-white/90',
          props.className
        )}
      />
    )
  }
);

Secondary.displayName = 'Button.Secondary';

const Destructive = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        className={cn(
          'bg-red-900/50 text-red-400 border border-transparent hover:bg-red-900/60',
          props.className
        )}
      />
    )
  }
);

Destructive.displayName = 'Button.Destructive';

const Warning = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        className={cn(
          'bg-yellow-900/50 text-yellow-400 border border-transparent hover:bg-yellow-900/60',
          props.className
        )}
      />
    )
  }
);

Warning.displayName = 'Button.Warning';

export const Button = Object.assign(BaseButton, {
  Primary,
  Secondary,
  Destructive,
  Warning
});
