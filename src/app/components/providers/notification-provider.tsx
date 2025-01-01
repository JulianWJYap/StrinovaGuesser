"use client"
import { createContext, useState, useContext, ReactNode } from "react";

// Define types for notification settings
interface NotificationSettings {
  visible: boolean;
  title: string;
  desc: string;
}

interface NotificationContextType {
  notification: NotificationSettings;
  showNotification: (title: string, desc: string) => void;
  hideNotification: () => void;
}

// Create the context with default values
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Notification Provider Component
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationSettings>({
    visible: false,
    title: "",
    desc: ""
  });

  const showNotification = (title: string, desc: string) => {
    setNotification({
      visible: true,
      title,
      desc
    });
  };

  const hideNotification = () => {
    setNotification({
      visible: false,
      title: "",
      desc: ""
    });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
