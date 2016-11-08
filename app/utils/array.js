const getCenterArrayIndex = ({ length }): number => {
  const l = length - 1;
  // it checks if the length is odd or even and finds the center we like
  const centerIndex = l % 2 ? Math.ceil(l / 2) : Math.floor((l) / 2);

  return centerIndex;
};

export {
  getCenterArrayIndex
};
