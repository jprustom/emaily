module.exports=function(req,res,next){
    if (req.user.credits<1)
        return res.status(403).json({error:'not enough credits'});
    next();
}