const Admin = require('../../models/admin');
const { validationResult } = require('express-validator/check');
const { signJwt } = require('../../utils/helperFunctions');

// Handles Admin Login
module.exports.login = (req, res, next) => {
  // Extracting Validation Errors from Express Validator
  const validationError = validationResult(req).array();

  // If Validation Error Exists => Show Error Message
  if (validationError.length > 0) {
    let errors = validationError.map(obj => obj.msg);
    return res.status(422).json({
      msg: errors
    });
  }

  // Find User With Given Email
  Admin.findOne({ where: { email: req.body.email } })
    .then(admin => {
      // Check If user Exists with the given Email
      if (admin) {
        // Check for the correct password
        admin
          .checkPassword(req.body.password)
          .then(isMatch => {
            if (isMatch) {
              // Sign JWT Token
              signJwt(admin.id, 'admin', (error, token) => {
                if (error) {
                  return next(error);
                } else {
                  return res.status(200).json({
                    msg: ['Logged In Successfully'],
                    token: token
                  });
                }
              });
            } else {
              let errors = ['Invalid Credentials'];
              return res.status(422).json({
                msg: errors
              });
            }
          })
          .catch(error => {
            next(error);
          });
      } else {
        // If no user exists => error message
        let errors = ['Invalid Credentials'];
        return res.status(422).json({
          msg: errors
        });
      }
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getProfile = (req, res, next) => {
  if (!req.user) {
    return;
  }
  Admin.findByPk(req.user.id, { attributes: ['id', 'fullName', 'email'] })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: ['No User Found'] });
      }
      return res.status(200).json({ user: user });
    })
    .catch(error => {
      next(error);
    });
};

module.exports.putProfile = (req, res, next) => {
  if (!req.user) {
    return;
  }

  // Extracting Validation Errors from Express Validator
  const validationError = validationResult(req).array();

  // If Validation Error Exists => Show Error Message
  if (validationError.length > 0) {
    let errors = validationError.map(obj => obj.msg);
    return res.status(422).json({
      msg: errors
    });
  }

  const userInput = {
    fullName: req.body.fullName,
    email: req.body.email
  };

  Admin.findByPk(req.user.id, { attributes: ['id', 'fullName', 'email'] })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: ['No User Found'] });
      }

      for (const key in userInput) {
        user[key] = userInput[key];
      }

      user
        .save()
        .then(user => {
          return res.status(200).json({ user: user });
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
};

// Handles Change Password
module.exports.changePassword = (req, res, next) => {
  if (!req.user) {
    return;
  }

  // Extracting Validation Errors from Express Validator
  const validationError = validationResult(req).array();

  // If Validation Error Exists => Show Error Message
  if (validationError.length > 0) {
    let errors = validationError.map(obj => obj.msg);
    return res.status(422).json({
      msg: errors
    });
  }

  let fetchedUser;

  // Find User
  Admin.findByPk(req.user.id, { attributes: ['id', 'password'] })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: ['No User Found'] });
      }
      fetchedUser = user;
      return user.checkPassword(req.body.password);
    })
    .then(isMatch => {
      if (isMatch) {
        fetchedUser.password = req.body.newPassword;
        fetchedUser
          .save()
          .then(() => {
            res.json({
              msg: ['Password Changed Successfully']
            });
          })
          .catch(error => {
            next(error);
          });
      } else {
        res.status(422).json({
          msg: ['Incorrect Password']
        });
      }
    })
    .catch(error => {
      next(error);
    });
};
