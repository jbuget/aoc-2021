function id(x, y) {
  return `${x}:${y}`;
}

class Vertex {
  x;
  y;
  cost;
  riskLevel;
  adjacents;
  previous;

  constructor(x, y, cost) {
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.adjacents = [];
    this.previous = null;
    this.riskLevel = Infinity;
  }

  get id() {
    return id(this.x, this.y);
  }

  addAdjacent(vertex) {
    this.adjacents.push(vertex);
  }

  get path() {
    if (this.previous) {
      return this.previous.path + ' -> ' + this.id;
    }
    return this.id;
  }
}

function dijkstra(graph, startId, endId) {
  const visited = new Map();
  const toBeVisited = [];

  let start = graph.get(startId);
  start.riskLevel = 0;
  toBeVisited.push(start);

  while (toBeVisited.length > 0) {
    const vertex = toBeVisited.shift();

    if (vertex.id === endId) {
      continue;
    }

    if (visited.get(vertex.id)) {
      continue;
    }

    visited.set(vertex.id, vertex);

    console.log('visiting ' + vertex.id);

    vertex.adjacents.forEach((adjacent) => {
      if ((vertex.riskLevel + adjacent.cost) <= adjacent.riskLevel) {
        adjacent.riskLevel = vertex.riskLevel + adjacent.cost;
        adjacent.previous = vertex;
      }
      if (!visited.get(adjacent.id)) {
        toBeVisited.push(adjacent);
      }
    });
  }
}

function partOne(data) {
  let maxX, maxY;

  const graph = data.split('\n').reduce((map, line, y) => {
    line.split('').forEach((cost, x) => {
      const vertex = new Vertex(x, y, parseInt(cost));
      map.set(id(x, y), vertex);
      maxX = x;
    });
    maxY = y;
    return map;
  }, new Map());

  graph.forEach((vertex, key, map) => {
    const up = map.get(id(vertex.x, vertex.y - 1));
    const right = map.get(id(vertex.x + 1, vertex.y));
    const bottom = map.get(id(vertex.x, vertex.y + 1));
    const left = map.get(id(vertex.x - 1, vertex.y));

    if (up) vertex.addAdjacent(up);
    if (right) vertex.addAdjacent(right);
    if (bottom) vertex.addAdjacent(bottom);
    if (left) vertex.addAdjacent(left);
  });

  dijkstra(graph, '0:0', id(maxX, maxY));

  const end = graph.get(id(maxX, maxY));

  console.log(end.path);

  return end.riskLevel;
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo };
