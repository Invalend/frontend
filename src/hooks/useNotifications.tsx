"use client";

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

interface Notification {
  id: string;
  hash?: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  timestamp: number;
  autoHide?: boolean;
  hideAfter?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 15);
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
      autoHide: notification.autoHide ?? true,
      hideAfter: notification.hideAfter ?? 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-hide logic
    if (newNotification.autoHide && newNotification.status !== 'pending') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, newNotification.hideAfter);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
