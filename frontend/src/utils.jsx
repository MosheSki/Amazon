const getError = (error) => {
  return error.message && error.response.data.message
    ? error.respone.data.message
    : error.message;
};

export { getError };
