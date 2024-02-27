import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    picture?: String;
    @IsString()
    phonenumber?: String;
    @Length(0, 50, { message: 'Address length must be at most 50 characters' })
    @IsString()
    adress?: String;


}
