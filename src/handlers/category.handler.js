const productServices = require('../services');

const getCategory = async (req, res) => {
  // console.log(`req: ${req.query.name}`);
  // req: shoe
  const { name } = req.query;
  const getCategoryStatus = await productServices.getCategory(name);
  res.status(200).send(getCategoryStatus);
};
module.exports = {
  getCategory,
};
