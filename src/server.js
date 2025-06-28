import express from "express";
import dotenv from "dotenv";
import {ACTION} from './constatn.js'

const app = express();
dotenv.config()

const PORT = process.env.PORT || 8000;

app.use('/', ()=>{
    console.log(`Welcome to ${ACTION.APP_NAME}`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})