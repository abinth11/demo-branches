const mongoose = require("mongoose");
const connect = async () => {
  const url = "mongodb://localhost:27017";
  const dbName = 'jwt';

  try {
    await mongoose.connect(url, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const user = require("./schema").user;
module.exports = {
  connect,
  user,
};
