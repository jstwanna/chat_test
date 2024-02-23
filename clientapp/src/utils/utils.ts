import { Notification } from '../models/models';

export const addNotification = (
  notifications: Ref<Notification[]>,
  message: string,
  type: string
) => {
  const id = Math.random() + Date.now();
  notifications.value.push({ id, message, type });

  setTimeout(() => {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id
    );
  }, 3000);
};
