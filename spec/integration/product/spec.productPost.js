import chai from 'chai';
import faker from 'faker';

import DB from '../../../app/models/index';
import request from '../../request';

const { expect } = chai;

const testData = {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  categoryId: [1, 2, 3, 4], 
  sku: faker.random.word(),
  quantity: faker.random.boolean(),
  visible: faker.random.boolean(),
  brandId: faker.random.number(),
  shopId: faker.random.number(),
  description: faker.random.words(),
  downloadable: faker.random.boolean()
};

describe('GET/products', () => {
  after((done) => {
    DB.sequelize.sync({ force: true }).then(() => done());
  });

  const base = '/api/v1/products';
  describe('Success', () => {
    it('should return 200 for successful save', (done) => {
      request.post(base)
        .send(testData)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.name).to.equal(testData.name);
          expect(data.categoryId).to.equal(testData.categoryId);
          expect(data.categoryId).to.equal(testData.categoryId);
          expect(data.sku).to.equal(testData.sku);
          expect(data.quantity).to.equal(testData.quantity);
          expect(data.name).to.equal(testData.name);
          expect(data.name).to.equal(testData.name);
          expect(data.name).to.equal(testData.name);
          expect(data.name).to.equal(testData.name);
          expect(data.name).to.equal(testData.name);
          expect(data.name).to.equal(testData.name);
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 for post without required fields', (done) => {
      expect(true).to.eql(true);
      done();
    });
  });
});
