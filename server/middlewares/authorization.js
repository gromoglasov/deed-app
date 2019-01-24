const monk = require('monk');
const db = monk('localhost/deed');
const User = db.get('users');
const btoa = require('atob');
const jwt = require('jsonwebtoken');

//
const authorize = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization.includes('Basic')){
    let decrypted = btoa(req.headers.authorization.substring(6));
    const [username, password] = decrypted.split(':');
    console.log('Basic auth');

    const user = await User.find({userName: username});
    res.user = user[0];
    // console.log(res.user)
    if (!res.user || res.user.password != password) {
      res.status = 401;
      return;
    }

  } else {
    let username;
    jwt.verify(req.headers.authorization.substring(7), 'THE MYSTERY KEY', function(err, decoded) {
      username = decoded._id // bar
    });
    const user = await User.find({userName: username});
    res.user = user[0];
    req.body.query = req.body.query.replace('CONVERT_FROM_TOKEN', username)
    console.log(req.body);
    if (!res.user) {
      res.status = 401;
      return;
    }
    console.log('authorised through token');

    // check if the token matches anything
    // if not return to login
    // extend token duration
    // login
  }
  // console.log(req.headers.authorization);
  // console.log("-----------------------")
  // if (!username) return await next();


  return await next();
};

module.exports = authorize;
