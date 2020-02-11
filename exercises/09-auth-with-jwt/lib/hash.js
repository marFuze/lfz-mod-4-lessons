const bcrypt = require('./bcrypt');

exports.compare = async (plaintextPassword, hash) => {
  const isMatch = await bcrypt.compare(plaintextPassword, hash);
  
  return isMatch;
}

exports.generate = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}
