import User from '../../users/entities/user.entity';
import IAuthRepository from './auth.interface.repository';

export default class InMemoryAuthRepository implements IAuthRepository {
  users: User[] = [
    new User({
      id: 1,
      email: 'teste@email.com',
      name: 'testUser',
      password: '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq',
    }),
  ];

  async findByEmail(email: string) {
    const idx = this.users.findIndex((u) => u.email === email);

    if (idx === -1) return null;

    return this.users[idx];
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((p) => p.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    } else {
      const id = this.users.length + 1;

      user.id = id;

      this.users.push(user);
    }
  }
}
