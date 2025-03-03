import * as bcrypt from 'bcrypt';

async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
}

generateHash('TesteSenhaForte@123987!');
