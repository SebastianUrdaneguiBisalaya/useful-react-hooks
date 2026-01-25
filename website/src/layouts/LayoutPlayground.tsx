import { cn } from '@/lib/cn';

export interface LayoutPlaygroundProps {
  className?: string;
  children: React.ReactNode;
  title: string;
}

export default function LayoutPlayground({ className, children, title }: LayoutPlaygroundProps) {
  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto flex flex-col items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-md border border-white/20',
        className
      )}
    >
      <h3
        className='text-lg w-full text-center text-white/60 font-sora font-semibold'
      >
        {title}
      </h3>
      {children}
    </div>
  )
}
