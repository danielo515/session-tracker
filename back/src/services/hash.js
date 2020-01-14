const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const hash = promisify(bcrypt.hash.bind(bcrypt));
exports.hash = hash;
