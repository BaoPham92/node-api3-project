const express = require('express');
const user = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  console.log('req obj ' + req)
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  return user.getById(req.params.id)
    .then(result => res.status(200).json({ user: result }))
});

router.get('/:id/posts', validateUserId, (req, res) => {
  console.log('req obj ' + req)
});

router.delete('/:id', validateUserId, (req, res) => {
  console.log('req obj ' + req)
});

router.put('/:id', validateUserId, (req, res) => {
  console.log('req obj ' + req)
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  const error = {
    message: "invalid parameter or misssing id",
    value: !!id
  };

  if (!!id === false) {
    return res.status(400).json({ error })
  } else next()
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
