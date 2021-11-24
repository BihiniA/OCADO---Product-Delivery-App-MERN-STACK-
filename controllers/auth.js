const Buyer = require('../models/Buyer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/keys');

exports.signupController = async (req, res) => {
    const {firstName, lastName, businessId, businessLocation, phoneNumber, email, username, password}  = req.body;

    try{
        const user = await Buyer.findOne({ email });
        if(user) {
            return res.status(400).json({
                errorMessage: 'Email already exists',
            });
        }

        const newUser = new Buyer();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.businessId = businessId;
        newUser.businessLocation = businessLocation;
        newUser.phoneNumber = phoneNumber;
        newUser.email = email;
        newUser.username = username;
        
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.json({
            successMessage: 'Registration Success. Please SignIn',
        });

    }catch (err) {
        console.log('signupController error:', err);
        res.status(500).json({
            errorMessage: 'Server Error',
        })
    }
};


//Retrive the user details in backend 
exports.getUserInfo = async (req, res) => {
   /*  try {
      const newUser = await Buyer.find({});
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    } */
    Buyer.find().exec((err,user1) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingBuyer:user1
        });
    });
  };


  //Specific Data retrive
  exports.getUserInfoById = async (req, res) => {
   /*  try {
      const newUser = await Buyer.findById(req.params.id);
  
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
 */
 /*  module.exports = {
    getUserInfo,
    getUserInfoById,
  };*/

  let userId = req.params.id;

    Buyer.findById(userId,(err,user) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            user
        });
    });

  };

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await Buyer.findOne({ email });
      if(!user){
          return res.status(400).json({
              errorMessage: 'Invalid credentials',
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
          return res.status(400).json({
              errorMessage: 'Invalid credentials',
          });
      }

      const payload = {
          user: {
              _id: user._id,
          },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire}, (err, token) => {
          if(err) console.log('jwt error: ', err);
          const { _id, username, email, role} = user;

          res.json({
              token,
              user: { _id, username, email, role},
          });
      });

  }catch (err) {
      console.log('signinController error: ', err);
      res.status(500).json({
          errorMessage: 'Server error',
      });
  }
      
};


exports.deleteUserController = async (req, res) => {
/* try {
    await Buyer.findByIdAndDelete(req.params.id)
    res.json({
        successMessage: 'Deleted Success!',
    });
} catch (err) {
    console.log('updateUserController error: ', err);
    res.status(500).json({
        errorMessage: 'Server error',
    });
} */

Buyer.findByIdAndDelete(req.params.id).exec((err,deleteBuyer) => {
    if(err) return res.status(400).json({
        message:"Delete unsuccessfull",err
    });

    return res.json({
        message:"Delete Successfull",deleteBuyer
    });
});

}