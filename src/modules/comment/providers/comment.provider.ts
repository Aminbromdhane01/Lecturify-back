import type { Provider } from '@nestjs/common';

import { CommentRepository } from '../comment.repository';
import { CommentService } from '../comment.service';
import { COMMENT_REPOSITORY } from '../interfaces/comment.repository.interface';
import { COMMENT_SERVICE } from '../interfaces/comment.service.interface';

const commentProviders: Provider[] = [
  {
    provide: COMMENT_SERVICE,
    useClass: CommentService,
  },
  {
    provide: COMMENT_REPOSITORY,
    useClass: CommentRepository,
  },
];

export { commentProviders };
