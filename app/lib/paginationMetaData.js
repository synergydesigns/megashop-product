/**
  * paginationCalculation
  * @param {Object} data pagination condition
  * @returns {Object} return an object
  */
const paginationCalculation = (data) => {
  const {
    limit,
    page,
    count,
    length
  } = data;
  const totalPageCount = Math.ceil(count / limit);
  return {
    currentPageNumber: page,
    currentPageSize: length,
    totalPageCount,
    totalItemCount: count
  };
};

module.exports = paginationCalculation;
