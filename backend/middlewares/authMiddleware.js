const jwt =require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        if(!authHeader||!authHeader.startsWith('Bearer ')){
            return res.status(400).json("Unauthorized");
        }
        const token=authHeader.split(' ')[1];

        const decoded=jwt.verify(token,
process.env.SECRET
        );
        req.user=decoded;
        next();
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports=authMiddleware;