import { Injectable } from '@nestjs/common';
import User from '../entities/user.entity';
import IUsersRepository from './users.interface.repository';

@Injectable()
export default class UsersInMemoryRepository implements IUsersRepository {
  users: User[] = [
    new User({
      id: 1,
      email: 'teste@email.com',
      name: 'testUser',
      password: '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq',
      profile: 'client',
    }),

    new User({
      id: 2,
      email: 'teste2@email.com',
      name: 'testUser2',
      password: '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq',
      profile: 'client',
    }),

    new User({
      id: 3,
      email: 'teste3@email.com',
      name: 'testUser3',
      password: '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq',
      profile: 'client',
    }),

    new User({
      id: 4,
      email: 'teste4@email.com',
      name: 'testUser4',
      password: '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq',
      profile: 'admin',
    }),
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User> {
    const idx = this.users.findIndex((u) => u.id === id);

    if (idx === -1) return null;

    return this.users[idx];
  }

  async findByEmail(email: string): Promise<User> {
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
