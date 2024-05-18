import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  port: parseInt(process.env.KUDOS_PORT, 10) || 3000,
  auth: {
    jwtConstants: {
      secret: process.env.JWT_SECRET,
    },
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 1433,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || 'cib',
  },
});
