// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require('pg');

const poolConfig = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
};
export const pool = new Pool(poolConfig);
