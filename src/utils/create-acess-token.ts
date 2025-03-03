import { sign } from 'jsonwebtoken';

export default function createAccessToken(user) {
  const secret = 'test-secret';
  const expiresIn = '1d';

  return sign(user, secret, {
    expiresIn,
  });
}
