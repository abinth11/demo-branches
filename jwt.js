const jwt = require("jsonwebtoken");
module.exports = {
  verifyJwt: (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token);
    // const token = authHeader && authHeader.split(" ")[1];
 
    if (token == "null") {
      return res
        .status(401)
        .json({ invalidToken: true, message: "Unauthorized" });
    }

    jwt.verify(token, "access_secret_key", (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ invalidToken: true, message: '"Forbidden', err });
      }
      console.log(decoded);
      req.user = decoded;
      next();
    });
  },
  generateAccessToken: (userExist) => {
    try {
      const accessToken = jwt.sign(
        { username: userExist?.username, email: userExist?.email },
        "access_secret_key",
        { expiresIn: "20s" }
      )
      return accessToken
    } catch (error) {
      throw new Error(error);
    }
  }
};
