const { promisify } = require('util');
const bcrypt = require('bcrypt');

bcrypt.compare = promisify(bcrypt.compare);
bcrypt.genSalt = promisify(bcrypt.genSalt);
bcrypt.hash = promisify(bcrypt.hash);

module.exports = bcrypt;
