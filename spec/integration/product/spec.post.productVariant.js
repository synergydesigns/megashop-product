import chai from 'chai';
import faker from 'faker';

import DB from '../../../app/db/models/index';
import request from '../../request';

const { expect } = chai;


// test for successful create
// test for invalid data
let productVariant;
const testProduct = {
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

const generateVariant = (product, meta = undefined) => ([
  ...[
    faker.commerce.productName(),
    faker.commerce.productName(),
    faker.commerce.productName(),
    faker.commerce.productName()
  ].map((v, index) => ({
    productId: product.id,
    name: `${index} ${v}`,
    sku: faker.random.uuid(),
    variant_asset: faker.image.fashion(),
    weight: 40,
    price: 40,
    meta: meta || [
      {
        key: 'color',
        value: 'red'
      },
      {
        key: 'size',
        value: 'M'
      }
    ]
  }))
]);

describe('POST/products_variant', () => {
  before((done) => {
    DB.Product
      .create(testProduct)
      .then((product) => {
        productVariant = generateVariant(product);
        done();
      });
  });
  after((done) => {
    DB.sequelize.sync({ force: true }).then(() => done());
  });

  const base = '/api/v1/products/1/variants';
  describe('Success', () => {
    it('should return 200 for successful save', (done) => {
      request.post(base)
        .send({
          variants: productVariant,
          shopId: 2,
        })
        .expect(201)
        .end((err, res) => {
          if (err) { throw err; }
          const { message } = res.body;
          expect(message).to.equal('variants created');
          done();
        });
    });
  });

  describe('Failure', () => {
    it('should return 422 for post without shopId', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({})
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors[0].message).to.equal('"shopId" is required');
          done();
        });
    });
    it('should return 422 for post without meta', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          variants: generateVariant({ id: 1 }, []),
          shopId: 9
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors[0].message)
            .to.equal('"meta" does not contain 1 required value(s)');
          done();
        });
    });

    it('should return 422 meta should contain value', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          variants: generateVariant({ id: 1 }, [{
            key: 'color'
          }]),
          shopId: 9
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors[0].message).to.equal('"value" is required');
          done();
        });
    });

    it('should return 422 meta should contain key', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          variants: generateVariant({ id: 1 }, [{
            value: 'L'
          }]),
          shopId: 9
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors[0].message).to.equal('"key" is required');
          done();
        });
    });

    it('should return 422 variant does not contain, productId, name or sku', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          variants: [
            {
              variant_asset: 'http://lorempixel.com/640/480/fashion',
              weight: 40,
              price: 40,
              meta: [
                {
                  key: 'color',
                  value: 'red'
                }
              ]
            }
          ],
          shopId: 88
        })
        .expect(422)
        .end((err, res) => {
          if (err) { throw err; }
          expect(res.body.errors[0].message).to.eql('"name" is required');
          expect(res.body.errors[0].field).to.eql('variants, 0, name');
          expect(res.body.errors[1].message).to.eql('"sku" is required');
          expect(res.body.errors[1].field).to.eql('variants, 0, sku');
          expect(res.body.errors[2].message).to.eql('"productId" is required');
          expect(res.body.errors[2].field).to.eql('variants, 0, productId');
          done();
        });
    });

    it('should return 400 if product does not exist', (done) => {
      expect(true).to.eql(true);
      request.post(base)
        .send({
          variants: generateVariant({ id: 5 }),
          shopId: 2,
        })
        .expect(400)
        .end((err, res) => {
          if (err) { throw err; }
          expect(res.body.message).to.eql('An error occurred foreign Key constraint');
          done();
        });
    });
  });
});
