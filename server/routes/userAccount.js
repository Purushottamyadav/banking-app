const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const userData = require('../model/user')
const { body, validationResult } = require('express-validator')
const { validateToken } = require("../middleware/auth");
var jwt = require('jsonwebtoken');
router.use(express.json())

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        const data = await userData.findOne({ email: email })
        if (!data) {
            return res.status(400).json({ message: "Please Register First" })
        } else {
            bcrypt.compare(password, data.password, async function (err, result) {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                        data: data._id
                    }, process.env.SECRET);

                    return res.status(200).json({ message: "Success", token ,email })
                } else {
                    res.json({ message: "Invalid Details" })

                }
            });
        }

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})



router.post('/signup', body('email').isEmail(), body('password').isLength(min = 6, max = 16), async (req, res) => {
    const { email, password } = req.body
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).json({ message: error.array() })
        }
        const data = await userData.findOne({ email: email })
        if (data) {
            return res.status(500).json({
                message: "Already registered"
            })
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }

            const data = await userData.create({
                email,
                password: hash
            })
            res.status(200).json({
                status: "success",
                message: "Registeration successfull"
            })
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

})
router.post('/withdraw',validateToken,async(req,res)=>{
    try {
        const withdraw=req.body.amount
        const data=await userData.findOne({_id:req.bank})   
        if(withdraw === 0 ){
            res.status(201).json({message:'failed'})
        }
        else if(withdraw <= data.amount){
            if(withdraw > 0){
                const result=Number(data.amount)-Number(withdraw)
                await userData.updateOne({_id:req.bank},{amount:result})
                res.status(201).json({
                    message:"successfull"
                })   
            }
            else{
                res.status(501).json({message:'Please enter valid Amount'})
            }
            
        }
       
        else{
            res.status(501).json({message:'Your Balance Is Low'})
        }
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
router.post('/deposit',validateToken,async(req,res)=>{
    try {
        const deposit=req.body.amount
        if(deposit === 0 ){
            res.status(501).json({message:'failed'})
        }
        else{
            const data=await userData.findOne({_id:req.bank})
            const result= Number(deposit)+Number(data.amount)
             await userData.updateOne({_id:req.bank},{amount:result})
            res.status(201).json({
                message:"successfull"
            })
        }
        
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
router.get('/request',validateToken,async(req,res)=>{
    try {
        const data=await userData.findOne({_id:req.bank})
        res.status(201).json({
            message:"success",
            amount:data.amount})
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
module.exports = router;