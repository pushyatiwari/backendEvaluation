/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
const { Category, Item } = require('../models');

const insertIntoCategory = async (categoryData) => {
  //
  // console.log(categorydata.itemMetadata);
  // eslint-disable-next-line no-unused-vars
  const isCategoryPresent = await isCategoryExist(categoryData.name);
  // fetchItemDetails(categorydata.itemMetadata[0].id);
  // console.log(isCategoryPresent);
  // fetchItemDetails(categorydata.itemMetadata[0].id, categorydata.name);
  try {
    if (!isCategoryPresent) {
      const itemMetaDataParsed = parseItemMetaData(categoryData.itemMetadata);
      const category = await Category.create({
        categoryName: categoryData.name,
        description: categoryData.description,
        itemMetaData: itemMetaDataParsed,
      });
      await createItem(categoryData.name, categoryData.itemMetadata);
      return category;
    }
  } catch (error) {
    return error.message;
  }
};

const createItem = async (categoryName, items) => {
  try {
    for (let i = 0; i < items.length; i += 1) {
      await fetchItemAndInsertIntoItem(items[i].id, categoryName);
    }
  } catch (error) {
    return error.message;
  }
};
// itemMetadata: [
//     {
//       id: 'shoe_1',
//       name: 'nike air',
//       description: 'jordan made these famous!'
//     },
//     {
//       id: 'shoe_2',
//       name: 'adidas jumbo',
//       description: 'Extremely comforrtable shoes for all seasons'
//     }
//   ]
const parseItemMetaData = (itemMetaData) => {
  // eslint-disable-next-line no-useless-concat
  const itemMetaDataWithArrayOfString = itemMetaData.map((item) => `${'id' + ':'}${item.id},` + 'name' + `:${item.name},` + `description${item.description}`);
  return itemMetaDataWithArrayOfString;
};

// {
//   imageUrl: 'random image',
//   features: [
//     { name: 'Color', value: 'Red' },
//     { name: 'Size', value: 7 },
//     { name: 'Brand', value: 'Nike' }
//   ]
// }
const fetchItemAndInsertIntoItem = async (itemId, categoryName) => {
  try {
    const fetchedItem = await fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${itemId}`);
    const fetchedItemJson = await fetchedItem.json();
    // console.log(fetchedItemJson);
    const insert = await insertIntoItem(fetchedItemJson, itemId, categoryName);
    return insert;
  } catch (error) {
    return 'category does not exist';
  }
};

const insertIntoItem = async (itemData, itemId, categoryName) => {
  // console.log(parseItemFeatures(itemData.features));
  const isItemExists = await isItemExist(itemId);
  if (!isItemExists) {
    const item = await Item.create({
      categoryName,
      itemId,
      imageUrl: itemData.imageUrl,
      features: parseItemFeatures(itemData.features),
    });
    return item;
  }
};
const parseItemFeatures = (itemFeatures) => {
  // eslint-disable-next-line no-useless-concat
  const itemMetaDataWithArrayOfString = itemFeatures.map((item) => `${'name' + ':'}${item.name},` + 'value' + `:${item.value}`);
  return itemMetaDataWithArrayOfString;
};
// parse:- [
//   'name:Color,value:Red',
//   'name:Size,value:7',
//   'name:Brand,value:Nike'
// ]
const isCategoryExist = async (givenCategory) => {
  const category = await Category.findAll();
  const filterCategory = category.filter((q) => q.categoryName === givenCategory);
  console.log(filterCategory);
  if (filterCategory.length > 0) {
    return true;
  }
  return false;
};

const isItemExist = async (itemId) => {
  const items = await Item.findAll();
  const filterItems = items.filter((q) => q.itemId === itemId);
  if (filterItems.length > 0) {
    return true;
  }
  return false;
};

const deleteCategory = async (id) => {
  // console.log("deletion")
  const deleteCateg = await Category.destroy({
    where: {
      categoryName: id,
    },
  });
  return deleteCateg;
};

const getAllCategories = async () => {
  const category = await Category.findAll();
  // t all: [object SequelizeInstance:Quote],[object SequelizeInstance:Quote]
  console.log(category);
  return category;
};

const getAllItems = async () => {
  const item = await Item.findAll();
  // t all: [object SequelizeInstance:Quote],[object SequelizeInstance:Quote]
  // console.log(item);
  return item;
};

module.exports = {
  insertIntoCategory,
  createItem,
  parseItemMetaData,
  fetchItemAndInsertIntoItem,
  insertIntoItem,
  getAllCategories,
  getAllItems,
};
