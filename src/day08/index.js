const readNode = (dataPoints, index) => {
  const startIndex = index;
  const childCount = dataPoints[index];
  index = index + 1;
  const metadataCount = dataPoints[index];
  index = index + 1;

  const children = [];
  for (let i = 0; i < childCount; i = i + 1) {
    const child = readNode(dataPoints, index);

    index = child.endIndex;

    children.push(child);
  }

  const metadata = [];
  for (let i = 0; i < metadataCount; i = i + 1) {
    metadata.push(dataPoints[index]);
    index = index + 1;
  }

  return {
    startIndex,
    children,
    metadata,
    endIndex: index,
  };
};

const getMetadataChecksum = metadata => metadata.reduce((reduction, val) => reduction + val, 0);

const getNodeChecksum = node => {
  const childrenChecksum = node.children.reduce((reduction, child) => reduction + getNodeChecksum(child), 0);
  const metadataChecksum = getMetadataChecksum(node.metadata);

  return childrenChecksum + metadataChecksum;
};

const getNodeValue = node => {
  if (!node.children.length) {
    return getMetadataChecksum(node.metadata);
  }

  return node.metadata
    .filter(val => val <= node.children.length)
    .map(val => getNodeValue(node.children[val - 1]))
    .reduce((reduction, val) => reduction + val, 0);
};

const moduleA = input => {
  const dataPoints = input.split(' ').map(d => parseInt(d, 10));
  const root = readNode(dataPoints, 0);

  return getNodeChecksum(root);
};

const moduleB = input => {
  const dataPoints = input.split(' ').map(d => parseInt(d, 10));
  const root = readNode(dataPoints, 0);

  return getNodeValue(root);
};

export {
  getNodeChecksum,
  getNodeValue,
  readNode,
  moduleA,
  moduleB,
};
