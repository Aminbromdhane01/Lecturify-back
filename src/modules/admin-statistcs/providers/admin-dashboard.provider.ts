import { AdminStatisticsService } from '@app/modules/admin-statistcs/admin-statistics.service';
import { ADMIN_STATISTICS_SERVICES } from '@app/modules/admin-statistcs/admin-statistics.service.interface';
import type { Provider } from '@nestjs/common';

const AdminStatisticsProviders: Provider[] = [
  {
    provide: ADMIN_STATISTICS_SERVICES,
    useClass: AdminStatisticsService,
  },
];

export { AdminStatisticsProviders };
