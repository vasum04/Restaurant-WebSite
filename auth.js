const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const {JWT_SECRET} = require('../Config/keys')

router.post("/signup", (req,res)=>{
    const {name, email, password} = req.body
    // console.log(name, email, password)
    // return res.json(name, email, password)
    
    if(!name || !email || !password){
        return res.status(422).json({error: "Fill all the fields"})
    }
    //find if user already exists in the database
    User.findOne({email: email}).then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error: "Email already registered...!"})
        }

        //save in the database
        bcrypt.hash(password, 12).then(hashedPassword => {   
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            user.save().then(user=>{
                res.json({Message: "SignUp Successfull....!"})
            }).catch(err=>{
                console.log(err)
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})

router.post("/signin", (req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
     }

    User.findOne({email: email}).then(foundUser=>{
        if(!foundUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }

        bcrypt.compare(password,foundUser.password).then(doMatch => {
            if(doMatch){
                const token = jwt.sign({_id: foundUser._id}, JWT_SECRET)
                //sending data to the frontend
                const {name} = foundUser
                res.json({token, user: {name, email, password}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
       
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/data', (req, res) => {
    const data =  {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});



module.exports = router