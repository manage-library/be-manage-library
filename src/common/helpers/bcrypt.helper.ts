import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, saltOrRounds);

export const isMatchPassword = async ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> => await bcrypt.compare(password, hash);
