

/**
 * wraps around an async function to handle
 * promise rejection when an error is thrown
 *
 *  @param {function} fn handler
 *  @returns {object} response object
 */

// = fn =>
//   (req, res, next) =>
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err, req,  res));

const wrapper = handler => (req, res, next) => {
  return Promise.resolve(handler(req, res, next))
    .catch(next);
};

module.exports = wrapper;

