import pool from '../config/db.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

export const getUserDataByEmail = async (email) => {

    try{
        const query = "SELECT * FROM users WHERE email=$1"
        const result = await pool.query(query, [email])
        return result.rows[0]
    }catch(err){
        console.log("Something wrong with the getUserDataByEmail query: ", err)
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const createNewUser = async (username, password, email, phoneNumber, gender, role) => {

    try{
        const id = uuidv4(); 
         
        const encryptPasswrod = password ? await bcrypt.hash(password, 10) : null;
    
        const query = `INSERT INTO users (id, username, email, password, phoneNumber, gender, role) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email, phoneNumber, gender, role`
        const values = [id, username, email, encryptPasswrod, phoneNumber, gender, role='customer']
    
        const result = await pool.query(query, values);
        return result.rows[0]

    }catch(err){
       console.log("Something wrong with the createNewUser query: ", err)
       res.status(500).json({ success: false, message: "Server error" });
    }
}