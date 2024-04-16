var express = require('express');
const jwtoken = require('jsonwebtoken');
var router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');
const { expressjwt: jwt } = require('express-jwt');





router.use(jwt({
  secret: 'secret',
  algorithms: ['HS256']
}).unless({
  path: ['/api/login', '/api/register']
}));


function checkRole(role) {
  return function (req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).send('Your current permission group is not supported!');
    }
  };
}

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/api/login', async (req, res) => {
  const db = await connectToDB();

  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
  if (user && user.password === password) {
    const token = jwtoken.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send('auth fail');
  }
});

router.post('/api/register', async (req, res) => {
  const db = await connectToDB();
  const { username, password } = req.body;

  const existingUser = await db.collection('users').findOne({ username });
  if (existingUser) {
    return res.status(409).send('Username already registered!');
  }


  const newUser = {
    username,
    password,
    role: 'user'
  };

  await db.collection('users').insertOne(newUser);

  const token = jwtoken.sign({ userId: newUser._id, role: newUser.role }, 'secret', { expiresIn: '1h' });

  res.status(201).send({ token });
});



module.exports = router;
