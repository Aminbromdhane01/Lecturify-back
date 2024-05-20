import { Module } from '@nestjs/common';

import { NOTIFICATION_REPOSITORY } from './interfaces/notification.repository.interface';
import { NOTIFICATION_SERVICE } from './interfaces/notification.service.interface';
import { NotificationController } from './notification.controller';
import { notificationProviders } from './providers/notification.provider';

@Module({
  controllers: [NotificationController],
  providers: [...notificationProviders],
  exports: [NOTIFICATION_SERVICE, NOTIFICATION_REPOSITORY],
})
export class NotificationModule {}
