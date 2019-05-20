import express from 'express';

const router = express.Router();

router.get('/home', (req, res) => {
  res.json({
    success: true
  });
});

router.get('/stockquery', (req, res) => {
  // search by stocknumber
  if (req.query.stocknumber) {
    // TODO
  } else {
    res.json({
      success: true
    });
  }
});

export default router;