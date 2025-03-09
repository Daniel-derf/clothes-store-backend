import { sign } from 'jsonwebtoken';

export default function createAccessToken(user) {
  const secret = process.env.JWT_SECRET || 'test-secret';
  const expiresIn = '1d';

  return sign(user, secret, {
    expiresIn,
  });
}
