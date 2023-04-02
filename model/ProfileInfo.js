const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
  },
  tempAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  municipality: {
    type: String,
  },
  province: {
    type: String,
  },
  altEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  status: {
    type: String,
  },
  userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      unique:true
    },
});

module.exports = mongoose.model("ProfileInfo",profileSchema);
