import IAuthRepository from './auth.interface.repository';

export default class InMemoryAuthRepository implements IAuthRepository {
  users = [
    {
      id: 1,
      email: 'teste@email.com',
      password: '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq',
    },
  ];

  async findByEmail(email: string) {
    const idx = this.users.findIndex((u) => u.email === email);

    if (idx === -1) return null;

    return this.users[idx];
  }
}
