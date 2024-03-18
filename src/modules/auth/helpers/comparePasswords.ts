import * as bcrypt from 'bcrypt';

export async function comparePasswords(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(inputPassword, hashedPassword);
}
