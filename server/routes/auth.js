const express=require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User  = mongoose.model('User')
const bcrypt = require('bcryptjs')



//signUp route
router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error:"Please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Please add all the fields"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email, //As email:email both fileds are same so I wrote email only same for password,name
                password:hashedpassword,
                name
            })
          user.save()
          .then(user=>{
              res.json({message:"User saved successfully"})
          })
          .catch(err=>{
              console.log(err);
          })
        })
        .catch(err=>{
            console.log(err);
        })
    })  
})

router.post('/signin',(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please provide email and password both"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.json({message:"successfully signedIn"})
            }
            else
            {
                res.status(422).json({error:"Invalid email or password"}) 
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports = router