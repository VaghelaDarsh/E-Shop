import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        isSeller:user.isSeller
    },process.env.JWT_SECRET || 'somethings',
    {expiresIn:'100d'});
};


export const isAuth = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7,authorization.lenght);
        jwt.verify(token,process.env.JWT_SECRET || 'somethings', (err,decode) => {
            if(err){
                res.status(401).send({message:'Invalid token'});
            }
            else{
                req.user = decode;
                next();
            }
        })
    }
    else{
        res.status(401).send({message:'No token'});
    }
}


export const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send({message:'Not Admin'});
    }
}

export const isSeller = (req,res,next) => {
    if(req.user && req.user.isSeller){
        next();
    }
    else{
        res.status(401).send({message:'Not Seller'});
    }
}

export const isSellerOrAdmin = (req,res,next) => {
    if(req.user && (req.user.isSeller || req.user.isAdmin)){
        next();
    }
    else{
        res.status(401).send({message:'Not Admin/Seller'});
    }
}