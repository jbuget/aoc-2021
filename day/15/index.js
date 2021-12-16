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

function dijkstra(graph, startId) {
  const visited = new Map();
  const toBeVisited = [];

  let start = graph.get(startId);
  start.riskLevel = 0;
  toBeVisited.push(start);

  while (toBeVisited.length > 0) {

    const vertex = toBeVisited.sort((a, b) => a.riskLevel - b.riskLevel).shift();

    if (visited.get(vertex.id)) {
      continue;
    }

    visited.set(vertex.id, vertex);

    vertex.adjacents.forEach((adjacent) => {
      if ((vertex.riskLevel + adjacent.cost) < adjacent.riskLevel) {
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

  dijkstra(graph, '0:0');

  const end = graph.get(id(maxX, maxY));

  console.log(end.path);

  return end.riskLevel;
}

function partTwo(data) {
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

  const completeGraph = new Map();
  for (let i = 0 ; i < 5 ; i++) {
    for (let j = 0 ; j < 5 ; j++) {
      graph.forEach((vertex) => {
        const newX = vertex.x + (j * (maxX + 1));
        const newY = vertex.y + (i * (maxY + 1));
        let newCost = vertex.cost + i + j;
        newCost = ((newCost - 1) % 9) + 1;
        completeGraph.set(id(newX, newY), new Vertex(newX, newY, newCost));
      });
    }
  }

  completeGraph.forEach((vertex, key, map) => {
    const up = map.get(id(vertex.x, vertex.y - 1));
    const right = map.get(id(vertex.x + 1, vertex.y));
    const bottom = map.get(id(vertex.x, vertex.y + 1));
    const left = map.get(id(vertex.x - 1, vertex.y));

    if (right) vertex.addAdjacent(right);
    if (bottom) vertex.addAdjacent(bottom);
    if (up) vertex.addAdjacent(up);
    if (left) vertex.addAdjacent(left);
  });

  // print
  /*
  let output = '';
  for (let i = 0 ; i < (5 * (maxY + 1)) ; i++) {
    if (i > 0 && (i % (maxY + 1) === 0)) {
      output += '\n';
    }
    for (let j = 0 ; j < (5 * (maxX + 1)) ; j++) {
      if (j > 0 && (j % (maxX + 1) === 0)) {
        output += ' ';
      }
      const vertex = completeGraph.get(id(j, i));
      output += vertex.cost;
    }
    output += '\n';
  }
  console.log(output);
  */

  const endX = (5 * (maxX + 1)) - 1;
  const endY = (5 * (maxY + 1)) - 1;
  console.log(`maxX=${maxX}, maxY=${maxY}\nendX=${endX}, endY=${endY}`);

  dijkstra(completeGraph, '0:0');
  const end = completeGraph.get(id(endX, endY));
  return end.riskLevel;
}

module.exports = { partOne, partTwo };
