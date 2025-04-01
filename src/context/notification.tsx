import React, { useContext } from "react";
import { notification } from "antd";

interface INotificationProviderProps {
  children: React.ReactNode;
}

interface ICustomerNotification {
  success: (message: string) => void;
  error: (message: string) => void;
}
const NotificationContext = React.createContext<ICustomerNotification | null>(null);

// GLOBAL NOTIFICATION

let globalNotification: ICustomerNotification | null = null;

const NotificationProvider = ({ children }: INotificationProviderProps) => {
  const [api, contextHolder] = notification.useNotification();

  const customNotifcation: ICustomerNotification = {
    success(message: string) {
      return api.success({
        message,
      });
    },
    error(message: string) {
      return api.error({
        message,
      });
    },
  };

  globalNotification = customNotifcation;

  return (
    <NotificationContext.Provider value={customNotifcation}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

// GLOBAL NOTIFY FUNCTION
export const globalNotify = {
  success: (message: string) => globalNotification?.success(message),
  error: (message: string) => globalNotification?.error(message),
};
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};

export default NotificationProvider;
