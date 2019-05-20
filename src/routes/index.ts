import express, { Request, Response, NextFunction } from 'express';
import loginRouter from './login';
import signupRouter from './signup';
import candlestickchartRouter from './candlestickchart';
import stockqueryRouter from './stockquery';
import apiRouter from './api';

export const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/downloads', (req, res) => {
  res.render('downloads');
});

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
}

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/stockquery', isLoggedIn, stockqueryRouter);
router.use('/candlestickchart', isLoggedIn, candlestickchartRouter);
router.use('/api', isLoggedIn, apiRouter);

export default router;