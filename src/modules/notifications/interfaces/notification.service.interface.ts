import { envConstants } from '@app/config/constants';
import type { CreateNotificationDto } from '@app/modules/notifications/dto/create-notification.dto';
import type { Notification } from '@app/modules/notifications/notification.entity';

export const NOTIFICATION_SERVICE =
  envConstants.NotificationModule.NOTIFICATION_SERVICE;
export interface INotificationService {
  createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification>;
  getUserNotifications(userId: number): Promise<Notification[]>;
  markAllNotificationsAsRead(userId: number): Promise<number>;
}
