import type { Provider } from '@nestjs/common';

import { SentimentAnalysisService } from '../sentimental-analysis.service';
import { SENTIMENTAL_ANALYSIS_SERVICE } from '../sentimental-analysis.service.interface';

const SentimentalAnlysisProviders: Provider[] = [
  {
    provide: SENTIMENTAL_ANALYSIS_SERVICE,
    useClass: SentimentAnalysisService,
  },
];

export { SentimentalAnlysisProviders };
