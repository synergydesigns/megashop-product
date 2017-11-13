import chai from 'chai';
import faker from 'faker';

import DB from '../../../app/db/models/index';
import request from '../../request';

const { expect } = chai;

const testData = {
  name: 'apple',
  shopId: 2,
  description: faker.random.words(),
};

describe('POST/brands', () => {
  after((done) => {
    DB.sequelize.sync({ force: true }).then(() => done());
  });

  const base = '/api/v1/brands';
  describe('Success', () => {
    it('should return 200 for successful save', (done) => {
      request.post(base)
        .send(testData)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.name).to.equal(testData.name);
          expect(data.shopId).to.equal(testData.shopId);
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 if brand name already exist', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'apple',
          shopId: 2,
          description: 'test description'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('brand with name apple already exist');
          done();
        });
    });

    it('should return 422 if brand name is not in request body', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({})
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          const fields = ['name', 'shopId'];
          errors.forEach((err, index) => {
            expect(err.message).equal(`"${fields[index]}" is required`);
          });
          done();
        });
    });

    it('should return 422 if shopId is not an integer', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'philip',
          shopId: 'bad89'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).equal('"shopId" must be a number');
          done();
        });
    });
  });
});
