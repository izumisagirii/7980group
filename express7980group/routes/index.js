var express = require('express');
const jwtoken = require('jsonwebtoken');
// var passport = require('passport');
// var BearerStrategy = require('passport-http-bearer').Strategy;
var router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');
const { expressjwt: jwt } = require('express-jwt');

// const ObjectId = require('mongodb').ObjectId;
// process.env.TOKEN_SECRET = 'secret';

// passport.use(new BearerStrategy(
//   function (token, done) {
//     jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
//       if (err) { return done(err); }
//       return done(null, decoded, { scope: "all" });
//     });
//   }
// ));


//deprecated
// router.use(jwt({
//   secret: process.env.TOKEN_SECRET,
//   algorithms: ['HS256']
// }).unless({
//   path: ['/login', '/register']
// }));
const authenticateJWTadmin = (req, res, next) => {
  const authHeader = req.headers.authorization_my;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (user.role !== 'admin') {
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization_my;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwtoken.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) {
        console.log(err)
        console.log(process.env.TOKEN_SECRET)
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


router.delete('/posts/:id', authenticateJWTadmin, async (req, res) => {
  const db = await connectToDB();
  const postId = req.params.id;
  const post = await db.collection('posts').findOne({ "_id": new ObjectId(postId) });

  if (!post) {
    return res.status(404).send('not find post');
  }

  await db.collection('posts').deleteOne({ "_id": postId });
  res.send('success');
});


router.delete('/users/:username', authenticateJWTadmin, async (req, res) => {
  const db = await connectToDB();
  const username = req.params.username;
  const user = await db.collection('users').findOne({ "username": username });

  if (!user) {
    return res.status(404).send('not find user');
  }

  await db.collection('users').deleteOne({ "username": username });
  res.send('success');
});


router.post('/login', async (req, res) => {
  const db = await connectToDB();

  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
  if (user && user.password === password) {
    const token = jwtoken.sign({ userId: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '36h' });
    res.send({ token });
  } else {
    res.status(401).send('auth fail');
  }
});




router.get('/posts', authenticateJWT, async (req, res) => {
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

router.get('/comments/:id', async (req, res) => {
  try {
    const db = await connectToDB();
    const postId = req.params.id;

    const post = await db.collection('posts').findOne({ "_id": new ObjectId(postId) });
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).send(post.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send({ message: 'Error processing your request' });
  }
});

router.post('/comment', async (req, res) => {
  try {
    const db = await connectToDB();
    const { comment, id, username } = req.body;

    if (!comment) {
      return res.status(400).send({ message: 'Comment content is required.' });
    }

    const updateResult = await db.collection('posts').updateOne(
      { "_id": new ObjectId(id) },
      {
        $push: {
          comments: {
            username,
            comment,
            commentedAt: new Date()
          }
        }
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ message: 'Post not found.' });
    }

    res.status(200).send({ message: 'Comment added successfully.' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send({ message: 'Error processing your request.' });
  }
});


router.put('/post/like/:id', async (req, res) => {
  try {
    const db = await connectToDB();
    const postId = req.params.id;
    const senderName = req.body.senderName;
    const post = await db.collection('posts').findOne({ "_id": new ObjectId(postId) });

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const isLiked = post.likedBy.includes(senderName);
    if (isLiked) {
      await db.collection('posts').updateOne(
        { "_id": new ObjectId(postId) },
        { $inc: { likes: -1 }, $pull: { likedBy: senderName } }
      );
    } else {
      await db.collection('posts').updateOne(
        { "_id": new ObjectId(postId) },
        { $inc: { likes: 1 }, $push: { likedBy: senderName } }
      );
    }

    const updatedPost = await db.collection('posts').findOne({ "_id": new ObjectId(postId) });
    res.status(200).send(updatedPost);

  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).send({ message: 'Error processing your request' });
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const db = await connectToDB();
    const postId = req.params.id;

    const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
    // console.log(post);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    res.status(200).json({
      ...post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send({ message: 'Error fetching post' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const db = await connectToDB();
    const postId = req.params.id;
    const updateData = req.body;

    const updateResult = await db.collection('posts').updateOne(
      { _id: new ObjectId(postId) },
      { $set: updateData }
    );

    if (!updateResult.matchedCount) {
      return res.status(404).send({ message: 'Post not found' });
    }

    if (!updateResult.modifiedCount) {
      return res.status(400).send({ message: 'No changes made to the post' });
    }

    res.status(200).send({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send({ message: 'Error updating post' });
  }
});


router.post('/publish', async (req, res) => {
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

router.post('/register', async (req, res) => {
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
