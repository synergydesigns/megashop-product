import chai from 'chai';
import faker from 'faker';

import DB from '../../../app/db/models/index';
import request from '../../request';

const { expect } = chai;

const testData = {
  name: faker.commerce.productName(),
  price: 500,
  categoryId: [1, 2, 3, 4],
  sku: faker.random.word(),
  quantity: faker.random.number(),
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
          expect(parseInt(data.price)).to.eql(testData.price);
          expect(data.categoryId).to.deep.equal(testData.categoryId);
          expect(data.sku).to.equal(testData.sku);
          expect(data.quantity).to.equal(testData.quantity);
          expect(data.visible).to.equal(testData.visible);
          expect(data.brandId).to.equal(testData.brandId);
          expect(data.shopId).to.equal(testData.shopId);
          expect(data.description).to.equal(testData.description);
          expect(data.downloadable).to.equal(testData.downloadable);
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 for post without required fields', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({})
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          const fields = ['name', 'categoryId', 'sku', 'shopId'];
          expect(errors).to.be.lengthOf(errors.map((error, index) => {
            expect(error.field).to.equal(fields[index]);
            expect(error.message).to.equal(`"${fields[index]}" is required`);
            expect(error.location).to.equal('body');
          }).length);
          done();
        });
    });

    it('should return 422 if category is not an array', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'test product',
          sku: 'jkdbdjsbjkcbksbd',
          shopId: 9094,
          categoryId: 5
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors).to.deep.equal([
            {
              field: 'categoryId',
              message: '"categoryId" must be an array',
              location: 'body'
            }
          ]);
          done();
        });
    });

    it('should return unique constraint if shop already has product sku',
      (done) => {
        expect(true).to.eql(true);
        request.post(base)
          .send({
            name: 'test product',
            sku: testData.sku,
            shopId: testData.shopId,
            categoryId: [5]
          })
          .expect(422)
          .end((err, res) => {
            if (err) { throw err; }
            const { errors } = res.body;
            expect(errors).to.deep.equal([
              {
                field: 'sku',
                message: 'product with this sku already exist',
                location: 'database'
              }
            ]);
            done();
          });
      }
    );
  });
});
