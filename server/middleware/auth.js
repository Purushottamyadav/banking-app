const {verify} =require('jsonwebtoken')
const bank=require("../model/user")
const validateToken=(req,res,next)=>{
    const accessToken=req.header("accessToken")
    if(!accessToken) return res.json({message:"admin not Loged In"})
    try{
        verify(accessToken,process.env.SECRET,async(err,decode)=>{
            if(err){
                return res.status(400).json({message:err.message })
            }
            const data=await bank.findOne({_id:decode.data})
            if(data){
            req.bank=data._id
            next()
            }else{
            res.json({message:"failed"})
            }
        });
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports={validateToken};