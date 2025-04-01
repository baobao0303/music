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

  return (
    <NotificationContext.Provider value={customNotifcation}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export default NotificationProvider;
