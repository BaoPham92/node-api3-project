const express = require('express');
const Users = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const { body } = req;

  return Users.insert(body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ err }))
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  console.log('req obj ' + req)
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, async (req, res) => {
  console.log(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  console.log('req obj ' + req)
});

router.delete('/:id', validateUserId, (req, res) => {
  console.log('req obj ' + req)
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  console.log('req obj ' + req)
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  const error = {
    message: "invalid parameter or misssing id",
    value: !!id
  };

  // * IF INVALID ID THEN 400, ELSE CHECK IF USER EXIST FOR DATA RETURN.
  if (!!id === false) {
    return res.status(400).json({ error })
  } else Users.getById(req.params.id)
    .then(result => res.status(200).json({ user: result }))
    .catch(err => res.status(400).json({ err }))

  // * CONTINUE
  next();
}

function validateUser(req, res, next) {
  const { body } = req;
  const err = { message: "missing user data" };

  if (!!body === false || !!body.name === false) {
    return res.status(400).json({ err })
  } else next()
}

function validatePost(req, res, next) {
  const { body } = req;
  const err = { message: "missing post data" };

  if (!!body === false || !!body.text === false) {
    return res.status(400).json({ err })
  } else next()
}

module.exports = router;
