const { getError } = require('../utils/helperFunctions');

// MiddleWare To Check If the User is Authorized

module.exports = (role) => {
    if(!role) {
        role = 'user';
    }
    
    return (req,res,next) => {
        if(req.user){
            if(req.user.role === role) {
                next();
            }
            else {
                throw getError(401, 'Unauthorized User');
            }
        }
        else{
            throw getError(401, 'Unauthorized User');
        }
    }
}