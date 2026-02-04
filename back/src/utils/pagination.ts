export const paginate = (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export default paginate;
