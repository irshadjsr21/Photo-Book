
// MiddleWare To Check If the User is Authorized

module.exports = (role) => {
    if(!role) {
        role = 'user';
    }
    
    return (req,res,next) => {
        if(req.user && req.user.role === role){
            next();
        }
        else{
            return res.status(401).json({
                msg: [
                    "Unauthorized User"
                ]
            });
        }
    }
}