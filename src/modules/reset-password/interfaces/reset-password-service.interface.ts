import { ResetPasswordDto } from "../dto/create-rest-password.dto";
import { ResetPassword } from "../reset-password.entity";

export interface IResetPasswordService {

    create({ email, token }: ResetPasswordDto): Promise<ResetPassword>
}