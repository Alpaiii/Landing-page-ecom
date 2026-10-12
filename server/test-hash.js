const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password:', password);
  console.log('Hash:', hash);
  
  // Test compare
  const isValid = await bcrypt.compare(password, hash);
  console.log('Test compare:', isValid);
}

generateHash();
