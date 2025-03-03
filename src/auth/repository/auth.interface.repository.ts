import User from 'src/users/entities/user.entity';

export default interface IAuthRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
