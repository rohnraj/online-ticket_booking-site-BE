import { getUserDataByEmail, createNewUser } from "../models/authModel.js";

export const getRegisteredController = async (req, res, next) => {
  try {
    console.log("runnng");
    const { username, password, email, phoneNumber, gender, role } = req.body;
    if (!username || !password || !email || !phoneNumber || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "Data not sent properly" });
    }

    if (role && role.toLowerCase() === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin role cannot be created via API",
      });
    }
    const userAlreadyRegistered = await getUserDataByEmail(email);
    if (userAlreadyRegistered) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const NewUser = await createNewUser(
      username,
      password,
      email,
      phoneNumber,
      gender,
      role
    );
    if (NewUser) {
      return res.status(200).json({
        success: true,
        message: "Account registered successfully in DB",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
