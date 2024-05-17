import type { INotificationService } from '@app/modules/notifications/interfaces/notification.service.interface';
import { Inject } from '@nestjs/common';

import type { CreateNotificationDto } from './dto/create-notification.dto';
import type { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  INotificationRepository,
  NOTIFICATION_REPOSITORY,
} from './interfaces/notification.repository.interface';
import type { Notification } from './notification.entity';

export class NotificationService implements INotificationService {
  @Inject(NOTIFICATION_REPOSITORY)
  private readonly notificationRepository: INotificationRepository;

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationRepository.createNotification(
      createNotificationDto,
    );
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return this.notificationRepository.getUserNotifications(userId);
  }

  async markAllNotificationsAsRead(userId: number): Promise<number> {
    return this.notificationRepository.markAllNotificationsAsRead(userId);
  }
}
