import IUsersRepository from '../repository/users.interface.repository';

export default class FindUserByIdUseCase {
  constructor(readonly repository: IUsersRepository) {}

  async execute(id: number) {
    const user = await this.repository.findById(id);

    return user;
  }
}
