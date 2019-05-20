import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id == 1234) {
    res.render('candlestickchart.ejs', {});
  } else {
    res.redirect('/stockquery');
  }
});

export default router;