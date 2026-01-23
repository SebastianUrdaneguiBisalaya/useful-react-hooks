'use client';

import { useState } from 'react';
import { usePreviousDistinct } from '../../../../../../src/index';

const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export default function Playground() {
  const [color, setColor] = useState('#3b82f6');
  const prevColor = usePreviousDistinct(color);

  return (
    <div className="p-6 rounded-lg shadow-sm border border-white/20 space-y-6">
      <div className="flex gap-4 items-center">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xs font-sora text-white/60 uppercase font-bold">Current</p>
          <div
            className="h-12 w-full rounded-md"
            style={{ backgroundColor: color }}
          />
          <p className="text-sm font-reddit-sans text-white/80 mt-1 text-center">{color}</p>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xs font-sora text-white/60 uppercase font-bold">Previous Distinct</p>
          <div
            className="h-12 w-full rounded-md bg-slate-100"
            style={{ backgroundColor: prevColor }}
          />
          <p className="text-sm font-reddit-sans mt-1 text-center text-white/80">{prevColor ?? 'None'}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="h-8 rounded-md transition-transform active:scale-95 cursor-pointer"
            style={{ backgroundColor: c }}
            title={`Set to ${c}`}
          />
        ))}
      </div>

      <ul className="list-disc pl-4 flex flex-col gap-1 leading-tight">
        <li className='font-reddit-sans text-xs text-white/60'>Clicking a different color updates both.</li>
        <li className='font-reddit-sans text-xs text-white/60'>Clicking the <b>same color twice</b> will not change the Previous value.</li>
      </ul>
    </div>
  );
}
