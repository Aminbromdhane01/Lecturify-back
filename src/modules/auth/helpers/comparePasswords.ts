import * as bcrypt from 'bcrypt';

export async function comparePasswords(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  console.log(inputPassword, hashedPassword);

  return await bcrypt.compare(inputPassword, hashedPassword);
}
