'use client';

import { useToggle } from '../../../../../../src/index';
import { cn } from '@/lib/cn';

export default function Demo() {
  const { status, handleToggle } = useToggle({ defaultValue: false });
  return (
    <div className='flex flex-col items-center gap-4 p-4 w-full border border-white/20 rounded-lg shadow-sm'>
      <h2 className="text-lg text-white/60 font-medium font-sora">
        Toggle
      </h2>
      <button
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out',
          status ? 'bg-purple-500' : 'bg-white/20',
        )}
        onClick={handleToggle}
        type='button'
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full',
            'transition duration-200 ease-in-out',
            status ? 'translate-x-5' : 'translate-x-0',
            status ? 'bg-white' : 'bg-white/60',
          )}
        />
      </button>
      <p className='text-sm text-white/60 font-reddit-sans'>
        Status: {status.toString().charAt(0).toUpperCase() + status.toString().slice(1)}
      </p>
    </div>
  )
}
