const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productDetailsSchema = new Schema({
    detailDesc:{
        type:String
    },
    designer:{
       type:String,
       required:true
    },
    productType:{
        type:String
    },
    gender:{
        type:String
    },
    color:{
        type:String
    },
    review: [
        {
          type: Schema.Types.ObjectId,
          ref: "review",
        },
      ],
});
module.exports = mongoose.model("productDetails",productDetailsSchema);