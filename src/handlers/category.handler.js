const categoryServices = require('../services');

const getCategory = async (req, res) => {
  // console.log(`req: ${req.query.name}`);
  // req: shoe
  try {
    const { name } = req.query;
    const getCategoryStatus = await categoryServices.getCategory(name);
    res.status(200).send(getCategoryStatus);
  } catch {
    res.status(500).json({
      message: 'internal server error',
    });
  }
};

const getDistinctFeaturesOfCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const getFeatures = await categoryServices.getDistinctFeatures(id);
    res.send(getFeatures);
    return getFeatures;
  } catch {
    res.status(500).json({
      message: 'internal server error',
    });
  }
};

module.exports = {
  getCategory,
  getDistinctFeaturesOfCategory,
};
