import * as React from 'react';

export interface UseLocalNotificationResult {
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  notify: (options: UseNotificationOptions) => void;
}

export interface UseNotificationOptions extends NotificationOptions {
  title: string;
}

/**
 * `useLocalNotifications` is React hook for managing local notifications in the browser.
 *
 * @returns An object containing the support flag and notification controls.
 *
 * @example
 * ```tsx
 * const { notify, requestPermission, permission } = useNotifications();
 *
 * React.useEffect(() => {
 *   if (permission !== 'granted') requestPermission();
 * }, []);
 *
 * notify({ title: 'Hello', body: 'World' });
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useLocalNotifications(): UseLocalNotificationResult {
  const [permission, setPermission] = React.useState<NotificationPermission>(typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default');
  const isSupported = typeof window !== 'undefined' && 'Notification' in window;

  const requestPermission = React.useCallback(async () => {
    if (!isSupported) return 'denied';
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, [isSupported]);

  const notify = React.useCallback(
    ({
      title,
      badge,
      body,
      data,
      dir,
      icon,
      lang,
      requireInteraction,
      silent,
      tag,
    }: UseNotificationOptions) => {
      if (!isSupported) return;
      if (permission !== 'granted') {
        console.warn('Notifications are not allowed.');
        return;
      }
      const options: NotificationOptions = {
        ...(badge !== undefined && { badge }),
        ...(body !== undefined && { body }),
        ...(data !== undefined && { data }),
        ...(dir !== undefined && { dir }),
        ...(icon !== undefined && { icon }),
        ...(lang !== undefined && { lang }),
        ...(requireInteraction !== undefined && { requireInteraction }),
        ...(silent !== undefined && { silent }),
        ...(tag !== undefined && { tag }),
      }
      new Notification(title, options);
    }, [permission, isSupported]
  );

  return {
    isSupported,
    permission,
    requestPermission,
    notify,
  };
}
