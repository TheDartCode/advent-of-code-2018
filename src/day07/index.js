const TIME_PER_NODE = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const createNode = name => ({
  name,
  parents: [],
  children: [],
  timeNeeded: DAY_7_TIME_ADDITION + TIME_PER_NODE.indexOf(name[0]),
});

const parseEdge = line => {
  const regex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./;
  const match = line.match(regex);
  return {from: match[1], to: match[2]};
};

const parseInput = input => input
  .split('\n')
  .filter(line => !!line)
  .map(l => parseEdge(l));

const nodeNameAsc = (n1, n2) => {
  return n1.name.localeCompare(n2.name);
};

const setNodeParent = (child, parent) => {
  parent.children.push(child);
  child.parents.push(parent);
};

const createGraph = edges => {
  const nodes = {};

  edges.forEach(dep => {
    const {from, to} = dep;

    if (!nodes[from]) {
      nodes[from] = createNode(from);
    }

    if (!nodes[to]) {
      nodes[to] = createNode(to);
    }

    setNodeParent(nodes[to], nodes[from]);
  });

  return Object.values(nodes).sort(nodeNameAsc);
};

const getNextAvailableNode = (frontier, visited) => {
  return frontier.find(node => {
    return node.parents.every(parent => visited.includes(parent.name));
  });
};

const walkGraph = nodes => {
  const frontier = nodes.filter(node => node.parents.length === 0).sort(nodeNameAsc);
  const path = [];

  const visitNode = node => {
    path.push(node.name);
    node.children.forEach(c => {
      if (!path.includes(c.name) && !frontier.includes(c)) {
        frontier.push(c);
      }
    });
    frontier.sort(nodeNameAsc);
  };

  while (frontier.length) {
    const nextNode = getNextAvailableNode(frontier, path);

    if (!nextNode) {
      throw new Error(`No node available for visiting\n${nodes.join('')}`);
    }

    frontier.splice(frontier.indexOf(nextNode), 1);
    visitNode(nextNode);
  }

  return path.join('');
};

const workGraph = nodes => {
  let tick = 0;
  const workers = new Array(DAY_7_WORKER_COUNT).fill(null).map(task => ({task}));
  const frontier = nodes.filter(node => node.parents.length === 0).sort(nodeNameAsc);
  const path = [];
  const steps = [];

  nodes.forEach(node => (node.done = false));

  const visitNode = node => {
    node.children
      .filter(child => !child.done)
      .filter(child => !frontier.includes(child))
      .forEach(child => frontier.push(child));

    frontier.sort(nodeNameAsc);
  };

  const advanceWork = worker => {
    if (tick - worker.start >= worker.task.timeNeeded) {
      path.push(worker.task.name);
      worker.task.done = true;
      worker.task = worker.start = null;
    }
  };

  const assignWork = worker => {
    const nextNode = frontier.find(node => {
      return node.parents.every(parent => parent.done);
    });

    if (!nextNode) {
      return;
    }

    frontier.splice(frontier.indexOf(nextNode), 1);
    visitNode(nextNode);

    worker.start = tick;
    worker.task = nextNode;
  };

  const logStep = () => {
    steps.push([
      tick,
      ...workers.map(worker => worker.task ? worker.task.name : '.'),
      path.join(''),
    ].join(', '));
  };

  // while there is something available in frontier && worker available
  while (frontier.length || workers.some(w => !!w.task)) {
    workers.filter(w => !!w.task).forEach(advanceWork);

    workers.filter(w => !w.task).forEach(assignWork);

    logStep();

    if (workers.every(w => !w.task) && frontier.length) {
      throw new Error(`Graph deadlock: all workers idle and no available nodes to visit\n${nodes.join('')}`);
    }

    tick = tick + 1;
  }

  return {
    ticks: tick - 1,
    path: path.join(''),
    steps,
  };
};

const moduleA = input => {
  const edges = parseInput(input);
  const nodes = createGraph(edges);
  return walkGraph(nodes);
};

const moduleB = input => {
  const edges = parseInput(input);
  const nodes = createGraph(edges);
  return workGraph(nodes).ticks;
};

export {
  parseEdge,
  createGraph,
  walkGraph,
  workGraph,
  moduleA,
  moduleB,
};
