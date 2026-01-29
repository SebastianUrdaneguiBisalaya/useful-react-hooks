'use client';

import { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useList } from "../../../../../../src";
import { cn } from "@/lib/cn";

export interface ToDoItem {
  title: string;
  completed: boolean;
}

export default function Demo() {
  const { items, insert, push, remove, update } = useList<ToDoItem>([]);
  const [task, setTask] = useState<string>('');

  return (
    <div className="w-full bg-transparent border border-white/20 p-4 flex flex-col items-center gap-4">
      <h2 className="text-lg font-sora font-medium text-white/60">ToDo</h2>
      <div className="w-full flex-1 flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="flex flex-row items-center gap-2">
          <input
            className="focus:outline-none font-reddit-sans border border-white/40 rounded-md px-4 py-2 w-full flex-1/3"
            onChange={(event) => setTask(event.target.value)}
            placeholder="Add task"
            type="text"
            value={task}
          />
          <button
            className='bg-purple-500 hover:bg-purple-600 transition-colors duration-500 ease-in-out rounded-full px-2 py-1 cursor-pointer aspect-square'
            onClick={() => push({ title: task, completed: false })}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full flex-2/3">
          {
            items.length > 0 && items?.map((item, idx) => (
              <div
                className='w-full flex flex-row items-center justify-between px-4 py-2'
                key={item.title}
              >
                <span className='font-reddit-sans text-white/70'>{item.title}</span>
                <div className='flex flex-row items-center gap-2'>
                  <button
                    className='bg-red-400 hover:bg-red-500 transition-colors duration-500 ease-in-out rounded-full aspect-square p-1 cursor-pointer'
                    onClick={() => remove(idx)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    className={cn(
                      'hover:bg-green-500 transition-colors duration-500 ease-in-out rounded-full aspect-square p-1 cursor-pointer',
                      item.completed ? 'bg-green-500' : 'bg-white/20'
                    )}
                    onClick={() => update(idx, { ...item, completed: !item.completed })}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <ul className="w-full flex flex-col items-start list-disc pl-4 gap-1 leading-tight">
        <li className='font-reddit-sans text-xs text-white/60'>Additionally, <b>useList</b> returns an <b>insert</b> function that allows you to add items to the list at a specific index.</li>
      </ul>
    </div>
  )
}
