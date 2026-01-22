'use client';

import React, { useState } from 'react';
import { useCountDown } from '../../../../../src/index';

const CountDown: React.FC = () => {
  const [endTime] = useState(() => Date.now() + 10_000);

  const {
    count,
    isPaused,
    controls: { start, pause, resume, reset, increment },
    status
  } = useCountDown({
    endTime: endTime,
    startOnMount: false,
    options: {
      interval: 100,
      onTick: (remaining) => {
        if (remaining < 10000) console.log("Final stretch!");
      },
      onComplete: () => {
        console.log("Countdown finished!");
      }
    }
  });

  const formatTime = (ms: number) => (ms / 1000).toFixed(0);

  return (
      <div className="flex flex-col items-center gap-4 w-full p-4 border border-white/20 rounded-lg shadow-sm">
        <div className='flex flex-col items-center'>
          <h2 className="text-lg text-white/60 font-medium font-sora">
            Time Remaining
          </h2>
          <h3 className="text-2xl font-bold font-reddit-sans">
            {formatTime(count)}s
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => start()}
            className='px-4 py-2 bg-sky-400 hover:bg-sky-500 transition-colors duration-500 ease-in-out text-white rounded-md cursor-pointer font-reddit-sans'
          >
            Start
          </button>
          <button
            onClick={isPaused ? resume : pause}
            className="px-4 py-2 bg-orange-400 hover:bg-orange-500 transition-colors duration-300 ease-in-out text-white rounded-md cursor-pointer font-reddit-sans"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={() => increment(10_000)}
            className="px-4 py-2 bg-purple-400 hover:bg-purple-500 transition-colors duration-500 ease-in-out rounded-md cursor-pointer font-reddit-sans"
          >
            10s +
          </button>

          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 transition-colors duration-500 ease-in-out rounded-md cursor-pointer font-reddit-sans"
          >
            Reset
          </button>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <p className="text-sm text-white/60 font-reddit-sans">
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
          <p className="text-sm text-white/60 font-reddit-sans">
            Paused: {isPaused ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
  );
};

export default CountDown;
