require('dotenv').config(); // .env 파일에서 환경 변수를 로드

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // 환경 변수에서 비밀번호를 로드
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD, // 프로덕션 환경에서도 환경 변수 사용
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
