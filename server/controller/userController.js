const User = require('../models/user');
const bcryptjs = require('bcryptjs')

exports.signUp= async (req,res)=>{
    try{
      const {name,email,rollNo,password} = req.body;
      
      let user = await User.findOne({email});
      if(user){
          return res.status(400).json({message: 'user already exists'});
      }
      const hashedPassword = await bcryptjs.hash(password, 10);

      user = new User({ name, rollNo, email, password: hashedPassword})
      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    }
    catch(error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
exports.login= async(req,res)=>{
  try{
    const {email, password}= req.body;

    let user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"invalid user"})
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({message:"invalid password"})
    }
    res.status(201).json({ message: 'login successfully' });
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.deleteUser = async(req,res)=>{
  try{
    const {email}= req.body;

    const deleteUser = await User.findOneAndDelete({ email });

    if(!deleteUser){
      return res.status(404).json({message:'User not found'})
    }
    res.status(200).json({message:'user deleted successfully'})
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.displayProfile= async(req,res)=>{
  try{
    const user = await User.find()
        res.json(user)
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.updateProfile= async(req,res)=>{
  try{
    
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}