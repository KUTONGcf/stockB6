import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

export default router;