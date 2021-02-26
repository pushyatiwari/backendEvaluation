const express = require('express');
const categoryHandler = require('../handlers/category.handler');

const categoryRouter = express.Router();
categoryRouter.get('/', categoryHandler.getCategory);
// quoteRouter.post('/:id', quoteHandler.getQuotesById);
// quoteRouter.delete('/:id', quoteHandler.deleteQuotesById);
// quoteRouter.put('/:id', updateValidator, quoteHandler.updateQuotesById);
module.exports = {
  categoryRouter,
};
