import User from '../entities/user.entity';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
