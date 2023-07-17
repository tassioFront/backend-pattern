import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const compare = async (password: string, hashedPassword: string) =>
  await bcrypt.compare(password, hashedPassword);

export const sign = async ({
  userId,
  isMasterAdmin,
}: {
  userId: string;
  isMasterAdmin: boolean;
}) =>
  await jwt.sign(
    {
      userId,
      isMasterAdmin,
    },
    process.env.JWT_SECRETE,
    { expiresIn: '1h' }
  );

export const hash = (password: string) => bcrypt.hash(password, 12);
