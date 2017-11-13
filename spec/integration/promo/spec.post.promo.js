import chai from 'chai';

import DB from '../../../app/db/models/index';
import request from '../../request';

const { expect } = chai;

const testData = {
  id: 98,
  label: 'apple',
  price: 12,
  productId: 1,
  shopId: 1,
  startDate: '2019-11-12T14:31:19.559Z',
  endDate: '2019-11-12T14:31:19.559Z'
};

describe('POST/products_promo', () => {
  after((done) => {
    DB.sequelize.sync({ force: true }).then(() => done());
  });

  const base = '/api/v1/products/1/promos';
  describe('Success', () => {
    it('should return 200 for successful save', (done) => {
      request.post(base)
        .send(testData)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.id).to.equal(testData.id);
          expect(data.label).to.equal(testData.label);
          expect(data.productId).to.eql(testData.productId);
          expect(data.shopId).to.eql(testData.shopId);
          expect(data.startDate).to.eql(testData.startDate);
          expect(data.endDate).to.eql(testData.endDate);
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 if required fields are not sent', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({})
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          const fields = ['label', 'price', 'productId', 'shopId', 'endDate'];
          errors.forEach((err, index) => {
            expect(err.message).equal(`"${fields[index]}" is required`);
          });
          done();
        });
    });

    it('should return 422 if start or end date is invalid', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          id: 98,
          label: 'apple',
          price: 12,
          productId: 1,
          shopId: 1,
          startDate: 'sdss',
          endDate: 'dasj'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message)
            .to.eql('"startDate" must be a number of milliseconds or valid date string');
          expect(errors[1].message)
            .to.eql('"endDate" must be a number of milliseconds or valid date string');
          done();
        });
    });

    it('should return 422 if endDate is before start date', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          id: 98,
          label: 'apple',
          price: 12,
          productId: 1,
          shopId: 1,
          startDate: '2019-11-12T14:31:19.559Z',
          endDate: '2018-11-12T14:31:19.559Z'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.eql('endDate should after start date');
          done();
        });
    });
  });
});
