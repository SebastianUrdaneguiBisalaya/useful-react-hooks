import { cn } from "@/lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

function BaseButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'w-fit font-reddit-sans text-sm transition-colors duration-500 ease-in-out px-4 py-1.5 rounded-lg cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function Primary(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={cn(
        'bg-white-100 border border-transparent text-neutral-900',
        props.className
      )}
    />
  )
}

function Secondary(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={cn(
        'bg-neutral-900 hover:bg-neutral-800 border border-white/20 text-white/70 hover:text-white/90',
        props.className
      )}
    />
  )
}

export const Button = Object.assign(BaseButton, {
  Primary,
  Secondary,
});
