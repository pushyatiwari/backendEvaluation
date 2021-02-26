/* eslint-disable implicit-arrow-linebreak */
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

const getDistinctFeatures = async (categoryId) => {
  const allItems = await databaseUtils.getAllItems();
  const allItemsWithCategory = allItems.filter((item) => item.categoryName === categoryId);
  //   {
  //     "id": 1,
  //     "categoryName": "shoes",
  //     "itemId": "shoe_1",
  //     "imageUrl": "random image",
  //     "features": [
  //         "name:Color,value:Red",
  //         "name:Size,value:7",
  //         "name:Brand,value:Nike"
  //     ],
  //     "createdAt": "2021-02-26T08:13:49.553Z",
  //     "updatedAt": "2021-02-26T08:13:49.553Z"
  // },

  const allFeatures = allItemsWithCategory.map((item) => item.features);
  const distinctFeatures = allFeatures.filter(onlyUnique);

  return distinctFeatures;
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
module.exports = {
  getCategory,
  getDistinctFeatures,
};

// [
//   {
//       "id": 6,
//       "categoryName": "shoes",
//       "description": "radiant shoes",
//       "itemMetaData": [
//           "id:shoe_1,name:nike air,descriptionjordan made these famous!",
//           "id:shoe_2,name:adidas jumbo,descriptionExtremely comforrtable shoes for all seasons",
//           "id:shoe_3,name:spunk jump,descriptionRunning shoes",
//           "id:shoe_4,name:reebok flex,descriptionBasketball shoes with awesome grip",
//           "id:shoe_5,name:umbro lite,descriptionWalking shoes with less weight",
//           "id:shoe_6,name:sketchers walker,descriptionWalking shoes with good grip",
//           "id:shoe_7,name:nike loop,descriptionCasual sports shoes",
//           "id:shoe_8,name:adidas sage,descriptionPeace shoes"
//       ],
//       "createdAt": "2021-02-26T08:31:03.229Z",
//       "updatedAt": "2021-02-26T08:31:03.229Z"
//   },

// [
//   {
//       "id": 1,
//       "categoryName": "shoes",
//       "itemId": "shoe_1",
//       "imageUrl": "random image",
//       "features": [
//           "name:Color,value:Red",
//           "name:Size,value:7",
//           "name:Brand,value:Nike"
//       ],
//       "createdAt": "2021-02-26T08:13:49.553Z",
//       "updatedAt": "2021-02-26T08:13:49.553Z"
//   },
//   {
