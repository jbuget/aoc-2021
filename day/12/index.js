class Cave {
  name;
  neighbors;

  constructor(name) {
    this.name = name;
    this.neighbors = [];
  }

  addNeighbor(cave) {
    this.neighbors.push(cave);
  }

  get isSmallCave() {
    return this.name[0] >= 'a' && this.name[0] <= 'z';
  }
}

function buildCaves(data) {
  return data.split('\n').reduce((caves, line) => {
    const [from, to] = line.split('-');
    if (!caves[from]) {
      caves[from] = new Cave(from);
    }
    if (!caves[to]) {
      caves[to] = new Cave(to);
    }
    caves[from].addNeighbor(caves[to]);
    caves[to].addNeighbor(caves[from]);
    return caves;
  }, {});
}


function dfs(cave, visited, paths) {
  visited.push(cave.name);
  if (cave.name === 'end') {
    paths.push(visited.join(','));
    return;
  }
  for (const neighbor of cave.neighbors) {
    if (neighbor.isSmallCave && visited.includes(neighbor.name)) {
      continue;
    }
    dfs(neighbor, [...visited], paths);
  }
}

function dfs2(cave, visited, oneSmallCaveAlreadyVisitedTwice, paths) {
  visited.push(cave.name);
  if (cave.name === 'end') {
    paths.push(visited.join(','));
    return;
  }
  for (const neighbor of cave.neighbors) {
    if (neighbor.name === "start") {
      continue;
    }
    if (neighbor.isSmallCave && visited.includes(neighbor.name)) {
      if (oneSmallCaveAlreadyVisitedTwice) {
        continue;
      }
      if (visited.filter((c) => c === neighbor.name).length >= 2) {
        continue;
      }
      dfs2(neighbor, [...visited], true, paths);
    } else {
      dfs2(neighbor, [...visited], oneSmallCaveAlreadyVisitedTwice, paths);
    }
  }
}


function partOne(data) {
  const caves = buildCaves(data);
  const paths = [];
  dfs(caves['start'], [], paths);
  return paths.length;
}

function partTwo(data) {
  const caves = buildCaves(data);
  const paths = [];
  dfs2(caves['start'], [], false, paths);
  return paths.length;
}

module.exports = { partOne, partTwo };
