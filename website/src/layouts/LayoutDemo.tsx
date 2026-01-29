import { cn } from '@/lib/cn';

export interface LayoutDemoProps {
  className?: string;
  children: React.ReactNode;
  title: string;
}

export default function LayoutDemo({ className, children, title }: LayoutDemoProps) {
  return (
    <div
      className={cn(
        'w-full max-w-lg mx-auto flex flex-col items-center gap-4 p-4 bg-neutral-900 rounded-lg shadow-md border border-white/20',
        className
      )}
    >
      <h3
        className='text-lg w-full text-center text-white/80 font-sora font-semibold'
      >
        {title}
      </h3>
      {children}
    </div>
  )
}
