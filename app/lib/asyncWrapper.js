

/**
 * wraps around an async function to handle
 * promise rejection when an error is thrown
 *
 *  @param {function} handler handler
 *  @returns {object} response object
 */
const wrapper = handler => (req, res, next) => {
  return Promise.resolve(handler(req, res, next))
    .catch((next));
};

module.exports = wrapper;
