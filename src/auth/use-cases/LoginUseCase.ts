// utils
import * as bcrypt from 'bcrypt';
import createAccessToken from '../../utils/create-acess-token';

// repositories
import IAuthRepository from '../repository/auth.interface.repository';

// types
import LoginDto from '../dto/login.dto';

export default class LoginUseCase {
  constructor(readonly authRepository: IAuthRepository) {}

  async execute(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authRepository.findByEmail(email);

    if (!user) throw new Error(`User does not exist in the system`);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
      const jwt = createAccessToken({ ...user });

      return { jwt };
    }
    throw new Error(`Invalid credentials`);
  }
}
