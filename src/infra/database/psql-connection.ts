import * as pgPromise from 'pg-promise';

const PSQL_URL =
  process.env.PSQL_URL ?? 'postgres://user:123456@localhost:5432/store';
const pgp = pgPromise();

export const connection = pgp(PSQL_URL);
