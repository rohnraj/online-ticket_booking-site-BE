import pkg from 'pg'
import dotenv from 'dotenv'
const {Pool} = pkg

dotenv.config();

var pool  = new Pool({
    connectionString: process.env.DB_URL
})

export default pool;