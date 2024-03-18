import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required' })
  firstname: string;
  @IsNotEmpty({ message: 'Last name is required' })
  lastname: string;
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
