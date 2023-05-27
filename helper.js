const bcrypt = require("bcrypt");
const {user} = require("./schema.js");
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

};
