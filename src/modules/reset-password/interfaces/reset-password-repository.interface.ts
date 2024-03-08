import { ResetPasswordDto } from "../dto/create-rest-password.dto";
import { ResetPassword } from "../reset-password.entity";

export interface IResetPasswordRepository {

    createResetPassword({ email, token }: ResetPasswordDto): Promise<ResetPassword>;


}