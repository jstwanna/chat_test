import { ApiException } from '../api/api-generated';
import { DEFAULT_ERROR, DEFAULT_SERVER_MESSAGE } from './constants';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

type NotificationType = 'error' | 'success';

export const notifications = ref<Notification[]>([]);

const getErrorMessage = (error: ApiException): string => {
  switch (error.status) {
    case DEFAULT_ERROR:
      return DEFAULT_SERVER_MESSAGE;
    default:
      return error.response.replace(/^"|"$/g, '');
  }
};

const addNotification = (message: string, type: NotificationType) => {
  const id = Math.random() + Date.now();
  const newNotification: Notification = { id, message, type };

  if (!notifications.value.some((notification) => notification.id === id)) {
    notifications.value.push(newNotification);

    setTimeout(() => {
      notifications.value = notifications.value.filter(
        (notification) => notification.id !== id
      );
    }, 3000);
  }
};

export const handleApiError = (error: ApiException, type: NotificationType) => {
  const errorMessage = getErrorMessage(error);
  addNotification(errorMessage, type);
};
