import IUsersRepository from '../repository/users.interface.repository';

export default class FindAllUsersUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
