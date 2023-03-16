const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const User = require('../../models/User');
const unirest = require('unirest');

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    var apiCall = unirest(
      'GET',
      'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/'
    );
    apiCall.headers({
      'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
      'x-rapidapi-key': '97a90b3fd6msh856169c507572f3p187edbjsn94db62d4d98b'
    });
    apiCall.end(function (result) {
      if (res.error) throw new Error(result.error);
      console.log(result.body);
      res.json(users);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
