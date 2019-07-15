require('dotenv').config();

let { DB_URI } = process.env;
const { PORT } = process.env;
const { TEST_URI } = process.env;
const { SECRET } = process.env;

if (process.env.NODE_ENV === 'test') {
  DB_URI = process.env.TEST_DB_URI;
}

module.exports = {
  DB_URI,
  PORT,
  TEST_URI,
  SECRET,
};
