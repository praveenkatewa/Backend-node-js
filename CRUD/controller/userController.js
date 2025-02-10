import User from "../model/userModel.js"

export const create = async(req,res)=>{
  try{
    const userData= new User(req.body);
    const {email}= userData;

    const userExist= await User.findOne({email});
    if(userExist){
      return res.status(400).json({message:"user already exists"});
    }

    const savedUser= await userData.save();
    res.status(200).json(savedUser);
  }catch(error){
    res.status(500).json({error:"internal server error"})

  }
}



export const fetch=async(req,res)=>{
  try{
    const users= await User.find();
    if(users.length ===0){
      return res.status(404).json({message:"user not found"});
    }
    res.status(200).json(users);

  }catch(error){
    res.status(500).json({error:"internal server error"})

  }
}




export const update= async (req,res)=>{
  try{
    const {_id}=req.body;
    // console.log(_id)
    // console.log(req.body);
    const userExist= await User.findOne({_id})
    // console.log(userExist)
    // return;
    if(!userExist){
      return res.status(404).json({message:"user not found"})
    }
    const updateUser= await User.findByIdAndUpdate(_id,req.body);
    // id,req.body,{new:true, }
    res.status(201).json(updateUser)

  }catch(error){
    res.status(500).json({error:"internal server error"})

  }
}




export const deleteUser= async (req,res)=>{
  try{
    const id=req.param.id;
    const userExist= await User.findOne({_id:id})
    if(!userExist){
      return res.status(404).json({message:"user not found"})
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({message:"user deleted successfully"})

  }catch(error){
    res.status(500).json({error:"internal server error"})
  }
}



