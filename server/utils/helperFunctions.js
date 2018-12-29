const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');
const path = require('path');
const fs = require('fs');

// To Encrypt Password
module.exports.encryptPass = (user) => {
    if(!user.changed('password')) {
        return;
    }
    return bcrypt.genSalt(12)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
        })
        .then(hash => {
            user.password = hash;
        })
}


module.exports.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

// Returns Signed JWT
module.exports.signJwt = async (id, role = 'user', cb) => {
    jwt.sign({
        id: id,
        role: role
    },
    config.JWT.KEY,
    {
        expiresIn: config.JWT.EXP
    },
    (error, token) => {
        if(error){
            return cb(error);
        }
        else{
            return cb(null, token);
        }
    });
}

module.exports.deleteImage = (url) => {
    const imagePath = path.join(__dirname, '../', 'public', url);
    fs.unlink(imagePath, (error) => {
        if(error) {
            console.log(error);
        }
    })
}