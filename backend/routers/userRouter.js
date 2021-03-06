import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModal.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  '/send',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user),
                isSeller:user.isSeller
            });
            return;
        }
    }
    res.status(401).send({message:'Invalid User or Password'});
}))


userRouter.post('/register',expressAsyncHandler(async(req,res)=> {
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,8),
  });
  const createdUser = await user.save();
  res.send({
    _id:createdUser._id,
    name:createdUser.name,
    email:createdUser.email,
    isSeller:user.isSeller,
    isAdmin:createdUser.isAdmin,
    token:generateToken(createdUser),
})
}));


userRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res) => {
  const user= await User.findById(req.params.id);
  if(user){
    res.send(user);
  }else{
    res.status(404).send({message:'User Not Found'});
  }
}))


userRouter.put('/update',isAuth,expressAsyncHandler(async(req,res)=> {
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(user.isSeller){
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description = req.body.sellerDescription || user.seller.description;
    }

    if(req.body.password) {
      user.password = bcrypt.hashSync(req.body.password,8);

    }
  }
  const UpdatedUser = await user.save();
  res.send({
    _id:UpdatedUser._id,
    name:UpdatedUser.name,
    email:UpdatedUser.email,
    isSeller:user.isSeller,
    isAdmin:UpdatedUser.isAdmin,
    token:generateToken(UpdatedUser),
})
}));

userRouter.get('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
  const users = await User.find({});
  res.send(users);
}));


userRouter.delete('/:id',isAuth, isAdmin, expressAsyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id);
  if(user){
    const deletedUser = await user.remove();
    res.send({message: 'User Deleted', user:deletedUser});
  }
  else{
    res.status(404).send({ message: 'User Not Found' });
  }
}));

userRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


export default userRouter;