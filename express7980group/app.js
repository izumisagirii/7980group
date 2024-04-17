var createError = require('http-errors');
// var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
const express = require('express');
// const jwt = require('jsonwebtoken');
const { expressjwt: jwt } = require('express-jwt');


const app = express();

app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:5173'
// }));


// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
// app.use(jwt({
//   secret: 'secret',
//   algorithms: ['HS256']
// }).unless({
//   path: ['/api/login', '/api/register']
// }));

// 连接数据库
// const db = await connectToDB();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/users', passport.authenticate('bearer', { session: false }), usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

process.env.TOKEN_SECRET = 'secret';