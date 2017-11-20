import chai from 'chai';
import faker from 'faker';

import DB from '../../../app/db/models/index';
import request from '../../request';

const { expect } = chai;

const dataWithoutParentCategoryID = {
  name: 'apple',
  shopId: 2,
  description: faker.random.words()
};

describe('POST/Product Category', () => {
  after((done) => {
    DB.sequelize.sync({ force: true }).then(() => done());
  });

  const base = '/api/v1/categories';
  let categoryId;
  describe('Success', () => {
    it('should return 200 for successful save when parent category Id is not supplied', (done) => {
      request.post(base)
        .send(dataWithoutParentCategoryID)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          categoryId = data.id;
          expect(data.name).to.equal(dataWithoutParentCategoryID.name);
          expect(data.shopId).to.equal(dataWithoutParentCategoryID.shopId);
          expect(data.parentCategoryId).to.equal(null);
          done();
        });
    });

    it('should return 200 for successful save when parent category Id is supplied', (done) => {
      const dataWithParentCategoryID = {
        name: 'apple',
        shopId: 2,
        description: faker.random.words(),
        parentCategoryId: categoryId
      };
      request.post(base)
        .send(dataWithParentCategoryID)
        .expect(201)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.name).to.equal(dataWithParentCategoryID.name);
          expect(data.shopId).to.equal(dataWithParentCategoryID.shopId);
          expect(data.parentCategoryId).to.equal(dataWithParentCategoryID.parentCategoryId);
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 if shop Id is not suppied', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'apple',
          description: 'test description'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('"shopId" is required');
          done();
        });
    });

    it('should return 422 if name is not supplied', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          shopId: 2,
          description: 'test description'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('"name" is required');
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

    it('should return 422 if parent category Id is not an integer', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'philip',
          shopId: 2,
          parentCategoryId: 'tttggdd'
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).equal('"parentCategoryId" must be a number');
          done();
        });
    });
    it('should return 422 if parent category ID does not belong to shop', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'apple',
          shopId: 10,
          description: faker.random.words(),
          parentCategoryId: categoryId
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('Invalid parent category');
          done();
        });
    });
    it('should return 422 if parent category ID does not exist', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          name: 'apple',
          shopId: 10,
          description: faker.random.words(),
          parentCategoryId: 1000000
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('Invalid parent category');
          done();
        });
    });
  });
});
