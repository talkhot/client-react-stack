// gets the distance to the parend node
const getDistanceX = (node1, node2) => {
  const node1rect = node1.getBoundingClientRect();
  const node2rect = node2.getBoundingClientRect();

  // get center point
  const node1x = node1rect.left + node1.offsetWidth / 2;
  const node2x = node2rect.left + node2rect.width / 2;

  const distanceSquared = Math.pow(node1x - node2x, 2);
  const distance = Math.sqrt(distanceSquared);

  return distance;
};

export {
  getDistanceX
};
