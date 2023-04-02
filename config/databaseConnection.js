const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDb;
