
import dotenv from 'dotenv'

import pkg from 'pg'
const {Pool} = pkg

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DB_URL
})

pool.on('connect', ()=>{
    console.log('connected to DB')
})

export default pool;
