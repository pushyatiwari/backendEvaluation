const categoryServices = require('../category.services');
const databaseUtils = require('../../utils/database.utils');

describe('category services: get category', () => {
  it('should return items', async () => {
    const category = {
      id: 7,
      categoryName: 'phones',
      description: 'phone shoes',
      itemMetaData: [
        'id:phone_1,name:iPhone 12,descriptionApple manufactured with amazing camera.',
        'id:phone_2,name:Oneplus 8,descriptionGreat performance at good prices',
        'id:phone_3,name:Samsung S10,descriptionPremium phone',
        'id:phone_4,name:OnePlus 5,descriptionCheaper alternative phone',
      ],
      updatedAt: '2021-02-26T08:57:12.929Z',
      createdAt: '2021-02-26T08:57:12.929Z',
    };
    jest.spyOn(databaseUtils, 'insertIntoCategory').mockResolvedValue(category);
    await categoryServices.getCategory('name');
  });
});
