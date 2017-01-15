const express = require('express');
const router = express.Router(); //eslint-disable-line new-cap
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const User = require('../models/user');

router
  .post('/signup', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;

    if(!username || !password) {
      return next({
        code: 400,
        error: 'Username and password required'
      });
    }

    User.find({ username })
      .count()
      .then(count => {
        if(count > 0) throw {
          code: 400,
          error: `Username ${username} already exists`
        };
        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => token.sign(user))
      .then(token => res.send({ token, username }))
      .catch(next);
  })

  //   Community.find({ name: community })
  //     .then(comm => {
  //       if (comm.length === 0) {
  //         const newComm = new Community({name: community});
  //         return newComm.save();
  //       } else {
  //         return comm[0];
  //       }
  //     })
  //     .then(community => {
  //     .catch(next);
  // })


  .post('/signin', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;

    User
      .findOne({ username })
      .then(user => {
        if (!user || !user.compareHash(password)) {
          throw({
            code: 400,
            error: 'Invalid username or password.'
          });
        }
        return token.sign(user);
      })
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router;