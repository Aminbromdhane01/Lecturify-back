import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from '@app/modules/auth/dto/create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
