"use client";

import { useNotifications } from '@/hooks/useNotifications';
import { TransactionNotification } from './TransactionNotification';

export const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <TransactionNotification
          key={notification.id}
          hash={notification.hash}
          status={notification.status}
          message={notification.message}
          autoHide={notification.autoHide}
          hideAfter={notification.hideAfter}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};
