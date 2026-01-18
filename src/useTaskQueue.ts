import * as React from 'react';

export interface Task<T = unknown> {
  id: string;
  run: () => Promise<T>;
}

export interface UseTaskQueueResult<T = unknown> {
  enqueue: (task: Task<T>) => void;
  running: boolean;
  queue: Task<T>[];
}

/**
 * `useTaskQueue` is a React hook that manages a queue of async tasks with concurrency control.
 *
 * @returns
 *
 * @example
 * ```tsx
 * const { enqueue, running, queue } = useTaskQueue();
 *
 * React.useEffect(() => {
 *   enqueue({ id: 'task1', run: async () => console.log('Task 1') });
 * }, []);
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useTaskQueue<T = unknown>(): UseTaskQueueResult<T> {
  const [queue, setQueue] = React.useState<Task<T>[]>([]);
  const [running, setRunning] = React.useState<boolean>(false);

  const processQueue = React.useCallback(async () => {
    if (running || queue.length === 0) return;
    setRunning(true);
    while (queue.length > 0) {
      const task = queue[0];
      try {
        await task?.run();
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setQueue(prev => [...prev.slice(1)]);
      }
    }
    setRunning(false);
  }, [queue, running]);

  const enqueue = React.useCallback(
    (task: Task<T>) => {
      setQueue(prev => [...prev, task]);
    }, [setQueue]
  );

  React.useEffect(() => {
    if (!running && queue.length > 0) processQueue();
  }, [queue, running, processQueue]);

  return {
    enqueue,
    running,
    queue,
  };
}
