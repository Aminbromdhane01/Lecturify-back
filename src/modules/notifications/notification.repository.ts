import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

import type { CreateNotificationDto } from './dto/create-notification.dto';
import type { INotificationRepository } from './interfaces/notification.repository.interface';
import { Notification } from './notification.entity';
export class NotificationRepository
  extends AbstractGenericRepository<Notification>
  implements INotificationRepository
{
  constructor(
    @Inject(DataSource) private readonly datasource: DataSource,
  ) {
    super(datasource, Notification);
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.createItem('Notification', createNotificationDto);
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return this.createQueryBuilder('notification')
      .innerJoin('notification.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async markAllNotificationsAsRead(userId: number): Promise<number> {
    const result = await this.createQueryBuilder('notification')
      .update()
      .set({ isRead: true })
      .where('notification.userId = :userId', { userId })
      .execute();

    return result.affected ?? 0;
  }
}
