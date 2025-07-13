import pool from '../config/db.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

export const getUserDataByEmail = async (email) => {

    try{
        const query = "SELECT * FROM userTable WHERE email=$1"
        const result = await pool.query(query, [email])
        console.log('result', result)
    }catch(err){
        console.log("Something wrong with the getUserDataByEmail query: ", err)
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const createNewUser = ({username, password, email, phoneNumber, gender, role}) => {

    try{
        const id = uuidv4(); 
        let encryptPasswrod = null
    
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                encryptPasswrod = hash
            });
        });
    
        const query = "INSERT INTO users (id, username, email, password, phoneNumber, gender, role) VALUES ($1, $2, $3, $4, $5, $6, $7)"
        const values = [id, username, email, encryptPasswrod, phoneNumber, gender, role='customer']
    
        const result = pool.query(query, values);
        console.log('create', result)
    }catch(err){
       console.log("Something wrong with the createNewUser query: ", err)
       res.status(500).json({ success: false, message: "Server error" });
    }
}