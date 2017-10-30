

/**
 * wraps around an async function to handle
 * promise rejection when an error is thrown
 * 
 *  @param {function} fn handler
 *  @returns {object} response object
 */
module.exports = fn =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
