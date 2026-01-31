'use client';

import { useState } from 'react';

import { useCountDown } from '../../../../../../src/index';

export default function Demo() {
  const [endTime] = useState(() => Date.now() + 10_000);

  const {
    controls: { increment, pause, reset, resume, start },
    count,
    status
  } = useCountDown({
    endTime: endTime,
    options: {
      interval: 100,
      onComplete: () => {
        console.log("Countdown finished!");
      },
      onTick: (remaining) => {
        if (remaining < 10000) console.log("Final stretch!");
      }
    },
    startOnMount: false
  });

  const formatTime = (ms: number) => (ms / 1000).toFixed(0);

  return (
      <div className="flex flex-col items-center gap-4 w-full p-4 border border-white/20 rounded-lg shadow-sm">
        <div className='flex flex-col items-center'>
          <h2 className="text-lg text-white/60 font-medium font-sora">
            Time Remaining
          </h2>
          <h3 className="text-2xl font-bold font-reddit-sans">
            {formatTime(count ?? 0)}s
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            className='px-4 py-2 bg-sky-400 hover:bg-sky-500 transition-colors duration-500 ease-in-out text-white rounded-md cursor-pointer font-reddit-sans'
            onClick={() => start()}
          >
            Start
          </button>
          <button
            className="px-4 py-2 bg-orange-400 hover:bg-orange-500 transition-colors duration-300 ease-in-out text-white rounded-md cursor-pointer font-reddit-sans"
            onClick={status === 'paused' ? resume : pause}
          >
            {status === 'paused' ? 'Resume' : 'Pause'}
          </button>

          <button
            className="px-4 py-2 bg-purple-400 hover:bg-purple-500 transition-colors duration-500 ease-in-out rounded-md cursor-pointer font-reddit-sans"
            onClick={() => increment(10_000)}
          >
            10s +
          </button>

          <button
            className="px-4 py-2 bg-red-400 hover:bg-red-500 transition-colors duration-500 ease-in-out rounded-md cursor-pointer font-reddit-sans"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>

        <p className="text-sm text-white/60 font-reddit-sans">
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>
  );
}
