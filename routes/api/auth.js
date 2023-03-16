const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user using mobile number
// @access  Public
router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      const newUser = new User({
        phone: req.body.phone
      });
      newUser.save();
    }
    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: req.body.phone, channel: 'sms' })
      .then((verification) => {
        console.log(verification.status);
        if (verification.status === 'pending')
          return res.json({
            msg: 'Please check your mobile number for OTP'
          });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/otp
// @desc    Enter the OTP
// @access  Public
router.post('/otp', async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    console.log(user)

    if (!user) {
      return res.status(401).json({
        msg: 'User does not have an account'
      });
    }
    client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: req.body.phone, code: req.body.otp })
      .then((verification_check) => {
        console.log(verification_check.status);
        if (verification_check.status === 'approved') {
          const payload = {
            user: {
              id: user._id
            }
          };
          console.log(payload)
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5 days' },
            (err, token) => {
              console.log(token)
              if (err) throw err;
              return res.json({ token, user });
            }
          );
        } else {
          return res.status(401).json({
            msg: verification_check.status
          });
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
