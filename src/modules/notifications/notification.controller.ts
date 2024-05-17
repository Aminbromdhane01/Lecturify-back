import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  INotificationService,
  NOTIFICATION_SERVICE,
} from './interfaces/notification.service.interface';
import type { Notification } from './notification.entity';

@Controller('notification')
export class NotificationController {
  @Inject(NOTIFICATION_SERVICE)
  private readonly notificationService: INotificationService;

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationService.createNotification(
      createNotificationDto,
    );
  }

  @Get()
  async getUserNotifications(
    @Query('userId') userId: number,
  ): Promise<Notification[]> {
    return this.notificationService.getUserNotifications(userId);
  }

  @Patch()
  async markAllNotificationsAsRead(
    @Body() { userId }: UpdateNotificationDto,
  ): Promise<number> {
    return this.notificationService.markAllNotificationsAsRead(userId);
  }
}
