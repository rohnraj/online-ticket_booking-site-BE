
import {getUserDataByEmail, createNewUser} from '../models/authModel.js'

export const getRegisteredController = async (req, res, next) => {
    try{
        console.log('runnng')
        const {username, password, email, phoneNumber, gender, role} = req.body()
        if(!username, !password, !email, !phoneNumber, !gender) res.status(400).json({success: false, message: "Data not send properly"})
            
        if(role.toLowerCase() === 'admin')  res.status(400).json({success:false, message: "Admin role cannot be created via a API"})
        const userAlreadyRegistered = await getUserDataByEmail(email)
        if(userAlreadyRegistered) res.status(409).json({success:false, message: "email already registered"})

        const NewUser = await createNewUser(username, password, email, phoneNumber, gender, role);
        if(NewUser) res.status(200).json({success: true, message: "Accout register successfully in DB"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}