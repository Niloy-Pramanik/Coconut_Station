const bcrypt = require('bcryptjs')

const password = process.argv[2]
if (!password) {
  console.error('Usage: node admin-hash.js <password>')
  process.exit(1)
}

bcrypt.hash(password, 10).then(hash => {
  console.log(`\nYour admin password hash is:\n\n${hash}\n\nAdd this to your .env.local as ADMIN_PASSWORD_HASH=\n`)
})
