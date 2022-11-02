const express = require('express');
const indexRouter = express.Router();

// Router level middleware
// indexRouter.use((req, res, next) => {
//   console.log(`index router - req method is ${req.method}`);
//   next();
// });

/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  res.status(200);
  res.send({ title: 'NeuKart application' });
  next();
});

module.exports = indexRouter;
