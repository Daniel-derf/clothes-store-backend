// repositories
import IAuthRepository from '../repository/auth.interface.repository';

// types
import RegisterDto from '../dto/register.dto';

// entities
import User from '../../users/entities/user.entity';

export default class RegisterUseCase {
  constructor(readonly authRepository: IAuthRepository) {}

  async execute(registerDto: RegisterDto) {
    const { email } = registerDto;

    const userAlreadyExists = await this.authRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error(`The provided email is already registered`);
    }

    const newUser = new User({ ...registerDto, id: 0 });

    await this.authRepository.save(newUser);
  }
}
