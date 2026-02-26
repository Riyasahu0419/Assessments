import { useEffect } from 'react';
import { Notification as NotificationType, NotificationType as NotificationTypeEnum } from '../../../types/weather.types';
import './Notification.css';

interface NotificationProps {
  notification: NotificationType;
  onDismiss: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, notification.duration);

    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  return (
    <div className={`notification notification--${notification.type}`}>
      <div className="notification__content">
        <span className="notification__icon">{getIcon(notification.type)}</span>
        <p className="notification__message">{notification.message}</p>
      </div>
      <button
        className="notification__close"
        onClick={() => onDismiss(notification.id)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
};

function getIcon(type: NotificationTypeEnum): string {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ℹ';
    default:
      return 'ℹ';
  }
}
