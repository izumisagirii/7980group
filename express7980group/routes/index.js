var express = require('express');
const jwtoken = require('jsonwebtoken');
var router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');
const { expressjwt: jwt } = require('express-jwt');

// const ObjectId = require('mongodb').ObjectId;




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




router.get('/api/posts', async (req, res) => {
  try {
    const db = await connectToDB();
    const { filter, sortType, searchText } = req.query;

    let query = {};
    if (searchText) {
      query.title = { $regex: searchText, $options: 'i' };
    }
    if (filter && filter != 'all') {
      query.topic = filter;
    }

    let sort = {};
    if (sortType === 'time') {
      sort.postTime = -1;
    } else if (sortType === 'likes') {
      sort.likes = -1;
    }

    // db.collection('posts').createIndex({ postTime: -1 });
    // db.collection('posts').createIndex({ likes: -1 });

    const posts = await db.collection('posts').find(query).sort(sort).toArray();
    const postIds = posts.map(post => ({ _id: new ObjectId(post._id) }));
    res.status(200).json(postIds);
  } catch (error) {
    console.error('Error loading posts:', error);
    res.status(500).send({ message: 'Error loading posts' });
  }
});

router.post('/api/publish', async (req, res) => {
  try {
    const db = await connectToDB();
    const { senderName, title, content, topic } = req.body;

    const post = {
      senderName,
      title,
      topic,
      content,
      postTime: new Date(),
      likes: 0,
      likedBy: [],
      comments: []
    };

    const result = await db.collection('posts').insertOne(post);
    if (result.acknowledged) {
      res.status(201).send({ message: 'Post published successfully', postId: result.insertedId });
    } else {
      throw new Error('Database insertion failed');
    }
  } catch (error) {
    console.error('Error publishing post:', error);
    res.status(500).send({ message: 'Error publishing post' });
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
