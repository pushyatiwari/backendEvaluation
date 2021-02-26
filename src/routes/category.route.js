const express = require('express');
const categoryHandler = require('../handlers/category.handler');

const categoryRouter = express.Router();
categoryRouter.get('/', categoryHandler.getCategory);
categoryRouter.get('/:id', categoryHandler.getDistinctFeaturesOfCategory);
module.exports = {
  categoryRouter,
};
