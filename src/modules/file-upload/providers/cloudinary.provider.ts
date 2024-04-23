import { envConstants } from '@app/config/constants';
import type { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ConfigOptions } from 'cloudinary';
import { v2 } from 'cloudinary';

const CloudinaryProvider: Provider[] = [
  {
    provide: envConstants.Cloudinary.CLOUDINARY,
    useFactory: (configService: ConfigService): void | ConfigOptions =>
      v2.config({
        cloud_name: configService.get(envConstants.Cloudinary.CLOUD_NAME),
        api_key: configService.get(envConstants.Cloudinary.CLOUD_KEY),
        api_secret: configService.get(
          envConstants.Cloudinary.CLOUD_SECRET,
        ),
      }),
    inject: [ConfigService],
  },
];

export { CloudinaryProvider };
