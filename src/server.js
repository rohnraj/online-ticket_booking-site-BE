    import express from "express";
    import dotenv from "dotenv";
    import {ACTION} from './constatn.js'
    import authRouter from '../src/routers/authRoutes.js'

    const app = express();
    dotenv.config()

    const PORT = process.env.PORT || 8080;


    app.use('/api/auth', authRouter)
    app.get('/', (req, res) => {
        res.send(`Welcome to ${ACTION.APP_NAME}`);
    });
      

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    })