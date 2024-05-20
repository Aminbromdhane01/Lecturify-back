import type { Provider } from '@nestjs/common';

import { NOTIFICATION_REPOSITORY } from '../interfaces/notification.repository.interface';
import { NOTIFICATION_SERVICE } from '../interfaces/notification.service.interface';
import { NotificationRepository } from '../notification.repository';
import { NotificationService } from '../notification.service';

const notificationProviders: Provider[] = [
  {
    provide: NOTIFICATION_SERVICE,
    useClass: NotificationService,
  },
  {
    provide: NOTIFICATION_REPOSITORY,
    useClass: NotificationRepository,
  },
];

export { notificationProviders };
