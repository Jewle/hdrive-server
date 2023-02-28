const Router = require('express').Router
const router = new Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/register', async (req,res)=>{
    const {email,password,name}  = req.body
   try{
       const candidate = await User.findOne({email})

       if(!password || !email){
           res.json({msg:'You dumb'})
           return
       }

       if(candidate){
           res.status(400).json({msg:'Such user exists'})
           return
       }
       const salt  = await bcrypt.genSalt(10)
       const passwordHash = await bcrypt.hash(password,10)
       const user = new User({
           email,
           name,
           password:passwordHash
       })
       await user.save()

       res.status(201).json({msg:'User created'})

   }
   catch (e) {
       console.log(e)
   }




})
router.post('/login' , async (req,res)=>{

    const {email,password}  = req.body
    console.log(email,password, 'such')
    try {
        const user = await User.findOne({email})

        if (!password || !email) {
            res.status(400).json({msg: 'You dumb'})
            return
        }
        if(!user){
            res.status(404).json({msg:'No such user'})
            return
        }

        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            res.status(400).json({msg:'Email or password are invalid'})
            return
        }
        const token = jwt.sign({
            email : user.email,
            id:user._id
        }, 'secret' , {expiresIn:3600})

        res.status(200).json({token,user:{name:user.name}})

    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router
