import { Injectable } from '@nestjs/common';
import User from '../entities/user.entity';
import IUsersRepository from './users.interface.repository';
import { connection } from '../../infra/database/psql-connection';

@Injectable()
export default class UsersPostgresRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    const usersData = await connection.query('select * from store.users');

    if (usersData.length) return usersData.map((user) => new User(user));
  }

  async findById(id: number): Promise<User> {
    const [userData] = await connection.query(
      'select * from store.users u where u.id=$1',
      [id],
    );

    if (userData) return new User(userData);
  }

  async findByEmail(email: string): Promise<User> {
    const [userData] = await connection.query(
      'select * from store.users u where u.email=$1',
      [email],
    );

    if (userData) return new User(userData);
  }

  async save(user: User): Promise<void> {
    if (user.id === 0) {
      await connection.query(
        'insert into store.users (name, password, email, profile) values ($1, $2, $3, $4)',
        [user.name, user.password, user.email, user.profile],
      );
    } else {
      await connection.query(
        'update store.users u set u.name=$1, u.password=$2, u.email=$3, u.profile=$4',
        [user.name, user.password, user.email, user.profile],
      );
    }
  }
}
