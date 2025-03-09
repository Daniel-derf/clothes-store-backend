// repositories
import IUsersRepository from '../../users/repository/users.interface.repository';

// types
import RegisterDto from '../dto/register.dto';

// entities
import User from '../../users/entities/user.entity';

export default class RegisterUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute(registerDto: RegisterDto) {
    const { email } = registerDto;

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error(`The provided email is already registered`);
    }

    const newUser = new User({ ...registerDto, profile: 'client', id: 0 });

    await this.usersRepository.save(newUser);
  }
}
