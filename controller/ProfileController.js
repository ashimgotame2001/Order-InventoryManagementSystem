const Profile = require('../model/ProfileInfo');
const User = require('../model/User');

const getProfileInfo=async(req,res) =>{
    const id  = req.id;
    try{
        const query  = {userId:id}
        const user = await Profile.findOne(query);
        if(user){
        return res.status(200).json({
            profileInfo:user
        });
    }
     return res.status(400).json({
        message:"User profile information Not Found !!"
     });
    }catch(err){
        throw err;
    }
};

const updateProfileInfo = async(req,res) =>{
  const id = req.id;
  const {firstName,lastName,permanentAddress,tempAddress,city,municipality,province,altEmail,phoneNumber} = req.body;
  try{
    const query = {userId:id};
    const userProfile = await Profile.findOne(query);
    if(userProfile){
        userProfile.firstName =firstName,
        userProfile.lastName = lastName,
        userProfile.permanentAddress = permanentAddress,
        userProfile.tempAddress = tempAddress,
        userProfile.city = city,
        userProfile.municipality = municipality,
        userProfile.province = province,
        userProfile.altEmail = altEmail,
        userProfile.phoneNumber = phoneNumber
        userProfile.status = "ACTIVE"
       const updatedProfileData = await userProfile.save();

       const user = await User.findById(id);
       user.firstName = updatedProfileData.firstName,
       user.lastName = updatedProfileData.lastName
       await user.save();
        return res.status(200).json({
            profileInfo:updatedProfileData
        });
    }
     return res.status(400).json({
        message:"User profile information Not Found !!"
     });
  }catch(err){
    throw err;
  }
}


exports.getProfileInfo = getProfileInfo;
exports.updateProfileInfo = updateProfileInfo;