const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msgApi: 'Get Response'
  });
});

router.put('/', (req, res) => {
  res.json({
    msgApi: 'Put Response'
  });
});

router.post('/', (req, res) => {
  res.json({
    msgApi: 'Post Response'
  });
});

router.delete('/', (req, res) => {
  res.json({
    msgApi: 'Delete Response'
  });
});

module.exports = router;