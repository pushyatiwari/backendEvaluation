const categoryHandler = require('../category.handler');
const categoryServices = require('../../services');

describe('category handler: get category', () => {
  it('should set status code 200 with quotes object', async () => {
    const mockRequest = {
      query: {
        name: 'hello',
      },
    };
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
    jest.spyOn(categoryServices, 'getCategory').mockResolvedValue(category);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await categoryHandler.getCategory(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(category);
  });

  it('should set status code 500 with error', async () => {
    jest.spyOn(categoryServices, 'getCategory').mockRejectedValue(new Error());
    const mockResponse = {
      json: jest.fn(() => mockResponse),
      status: jest.fn(() => mockResponse),
    };
    const mockRequest = {
      query: {
        name: 'hello',
      },
    };
    await categoryHandler.getCategory(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
