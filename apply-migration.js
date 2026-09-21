const { Pool } = require('pg');
const fs = require('fs');

async function run() {
  const pool = new Pool({ connectionString: 'postgresql://niloypramanik@localhost:5432/coconut_station' });
  const sql = fs.readFileSync('drizzle/0000_chilly_sumo.sql', 'utf8');
  await pool.query(sql);
  console.log("Migration applied");
  process.exit(0);
}
run().catch(console.error);
