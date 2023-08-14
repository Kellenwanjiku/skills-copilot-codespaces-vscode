//create web server
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateCommentInput = require('../../validation/comment');

//load models
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Profile = require('../../models/Profile');

// @route   GET api/comment/test
// @desc    Tests comment route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Comments Works' }));

// @route   POST api/comment
// @desc    Create comment
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { errors, isValid } = validateCommentInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.body.post)
      .then(post => {
        const newComment = new Comment({
          text: req.body.text,
          user: req.user.id,
          post: req.body.post
        });

        //add to comments array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
  }
);

// @route   DELETE api/comment/:id
// @desc    Delete comment
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Post.findById(req.body.post)
      .then(post => {
        //check for comment
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        //get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.id);

        //splice comment out of array
        post.comments.splice(removeIndex, 1);

        //save
        post.save().then(post => resconst express = require('express');
