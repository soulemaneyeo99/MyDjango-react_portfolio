
// ========== src/components/common/NotificationSystem.jsx ==========
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotifications } from '../../context/AppContext';

const NotificationItem = ({ notification, onRemove }) => {
  const { id, type = 'info', title, message, autoRemove = true, duration = 5000 } = notification;

  useEffect(() => {
    if (autoRemove) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, autoRemove, duration, onRemove]);

  const getNotificationStyle = () => {
    const styles = {
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        icon: CheckCircle,
        iconColor: 'text-green-600 dark:text-green-400'
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        icon: AlertCircle,
        iconColor: 'text-red-600 dark:text-red-400'
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        icon: AlertTriangle,
        iconColor: 'text-yellow-600 dark:text-yellow-400'
      },
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        icon: Info,
        iconColor: 'text-blue-600 dark:text-blue-400'
      }
    };
    return styles[type] || styles.info;
  };

  const style = getNotificationStyle();
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border rounded-lg p-4 shadow-lg backdrop-blur-sm animate-slide-down transform transition-all duration-300 hover:scale-102`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h4>
          )}
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
        </div>
        
        <button
          onClick={() => onRemove(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotifications();

  if (!notifications.length) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationSystem