/**
 * generateToken() - generates token from random characters
 * Return: string of random characters
 */
function generateToken() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';

  for (let i = 0; i < 20; i += 1) {
    const generate = letters[Math.floor(Math.random() * 64)];
    token += generate;
  }

  return token;
}

module.exports = generateToken;
