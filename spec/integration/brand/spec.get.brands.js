import chai from 'chai';
import faker from 'faker';

import DB from '../../../app/db/models/index';
import request from '../../request';

const { expect } = chai;

const brandArray = [
  {
    name: 'apple',
    shopId: 40,
    description: faker.random.words(),
  },
  {
    name: 'nokia',
    shopId: 40,
    description: faker.random.words(),
  },
  {
    name: 'samsung',
    shopId: 40,
    description: faker.random.words(),
  },
  {
    name: 'tecno',
    shopId: 40,
    description: faker.random.words(),
  },
  {
    name: 'samsung',
    shopId: 10,
    description: faker.random.words(),
  },
  {
    name: 'tecno',
    shopId: 10,
    description: faker.random.words(),
  }
];

describe('GET/shops/:shopId/brands', () => {
  before((done) => {
    DB.Brand.bulkCreate(brandArray)
      .then(() => done());
  });

  after((done) => {
    DB.sequelize.sync({ force: true }).then(() => done());
  });

  describe('Success', () => {
    it('should return 200 and pageCount of 4 for shopId 40 with default limit', (done) => {
      request.get(`/api/v1/shops/${brandArray[0].shopId}/brands`)
        .expect(200)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.brands.count).to.equal(4);
          expect(data.brands.rows.length).to.equal(4);
          expect(data.pagination.pageSize).to.equal(4);
          expect(data.pagination.page).to.equal(1);
          done();
        });
    });
    it('should return 200 and pageSize of 2 with limit set to 2', (done) => {
      request.get(`/api/v1/shops/${brandArray[0].shopId}/brands?limit=2`)
        .expect(200)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.brands.count).to.equal(4);
          expect(data.brands.rows.length).to.equal(2);
          expect(data.pagination.pageSize).to.equal(2);
          expect(data.pagination.page).to.equal(1);
          done();
        });
    });
    it('should return 200 and pageCount of 2 for shopId 10 with default limit', (done) => {
      request.get(`/api/v1/shops/${brandArray[4].shopId}/brands`)
        .expect(200)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.brands.count).to.equal(2);
          expect(data.brands.rows.length).to.equal(2);
          expect(data.pagination.pageSize).to.equal(2);
          expect(data.pagination.page).to.equal(1);
          done();
        });
    });
    it('should return 200 and count of 0 when shop does not have brands', (done) => {
      request.get('/api/v1/shops/100/brands')
        .expect(200)
        .end((err, res) => {
          if (err) { throw err; }
          const { data } = res.body;
          expect(data.brands.count).to.equal(0);
          expect(data.brands.rows.length).to.equal(0);
          expect(data.pagination.pageSize).to.equal(0);
          expect(data.pagination.pageCount).to.equal(0);
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 if shopID is not an integer', (done) => {
      expect(true).to.eql(true);
      request.get('/api/v1/shops/wwww/brands')
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('"shopId" must be a number');
          done();
        });
    });
    it('should return 422 if limit is not an integer', (done) => {
      expect(true).to.eql(true);
      request.get('/api/v1/shops/40/brands?limit=jjj')
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('"limit" must be a number');
          done();
        });
    });
    it('should return 422 if offset is not an integer', (done) => {
      expect(true).to.eql(true);
      request.get('/api/v1/shops/40/brands?limit=10&offset=jjj')
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          const { errors } = res.body;
          expect(errors[0].message).to.equal('"offset" must be a number');
          done();
        });
    });
  });
});
