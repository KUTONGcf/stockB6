import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

export default router;