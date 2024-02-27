import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "First name is required" })
    firstname: string;
    @IsNotEmpty({ message: "Last name is required" })
    lastname: string;
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
