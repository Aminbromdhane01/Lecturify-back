import { Module } from '@nestjs/common';

import { BookModule } from '../book/book.module';
import { CommentModule } from '../comment/comment.module';
import { AdminStatisticsController } from './admin-statistics.controller';
import { AdminStatisticsProviders } from './providers/admin-dashboard.provider';

@Module({
  imports: [BookModule, CommentModule],
  controllers: [AdminStatisticsController],
  providers: [...AdminStatisticsProviders],
})
export class AdminDashboardModule {}
