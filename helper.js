const bcrypt = require("bcrypt");
const {user} = require("./schema.js");
const JWTHelpers = require('./jwt')
module.exports = {
  registerUser: async (userInfo) => {
    try {
      const { username, email, password } = userInfo; 
      const emailExist = await user.find({ 'email':email });
      if (emailExist.length!==0) {
        return {
          status: false,
          Message: "Email already exist please try to login",
        };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = new user({
        username,
        email,
        password: hashedPassword,
      });
      const result = await data.save();
      return {
        status: true,
        data: result,
        Message: "Successfully registered",
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  loginUser: async (loginInfo) => {
    const { username, password } = loginInfo;
    try {
      const userExist = await user.findOne({ email:username });
      if (!userExist) {
        return {
          status: false,
          Message: "User does not exist please enter valid email",
        };
      }
      const hashedPassword = userExist?.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        const accessToken =  JWTHelpers.generateAccessToken(userExist) 
        return {
          status: true,
          accessToken,
          Message: "Successfully logged in",
        };
      } else {
        return {
          status: false,
          accessToken:null,
          Message: "Entered wrong password",
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

};
