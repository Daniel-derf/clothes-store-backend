export default interface IAuthRepository {
  findByEmail(email: string): Promise<any>;
}
