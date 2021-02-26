/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fetch = require('node-fetch');
const databaseUtils = require('../utils/database.utils');

const getCategory = async (name) => {
  try {
    const fetchedCategory = await fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${name}`);
    const fetchedCategoryJson = await fetchedCategory.json();
    const insert = await databaseUtils.insertIntoCategory(fetchedCategoryJson);
    return insert;
  } catch (error) {
    return 'category does not exist';
  }
};

const getAllCategory = async () => {
  const allCategory = await databaseUtils.getAllCategories();
  return allCategory;
};

module.exports = {
  getCategory,
};
