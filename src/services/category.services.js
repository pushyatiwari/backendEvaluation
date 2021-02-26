const fetch = require('node-fetch');

const getCategory = async (name) => {
  const fetchedCategory = await fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${name}`);
  const fetchedCategoryJson = fetchedCategory.json();

  return fetchedCategoryJson;
};

module.exports = {
  getCategory,
};
