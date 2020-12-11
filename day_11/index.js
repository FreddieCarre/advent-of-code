import { readFile } from '../utils/fileParser.js';

const getMap = () => {
  return readFile('./day_11/input.txt')
    .map(v => v.split(''));
};

const neightbourPoints = [
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 }
];

const getSeatStatus = (map, point) => {
  const current = map[point.y][point.x];
  const occNeighbours = neightbourPoints.map(v => {
    const newX = point.x + v.x;
    const newY = point.y + v.y;

    return { x: newX, y: newY };
  }).filter((v) => {
    return v.x >= 0 &&
      v.y >= 0 &&
      v.x < map[0].length &&
      v.y < map.length;
  }).map(v => map[v.y][v.x] === '#')
    .filter(Boolean);

  return [current, occNeighbours];
};

const getOccupied = (map) => {
  return map.flat().filter(v => v === '#').length;
};

const partOne = () => {
  let map = getMap();

  while (true) {
    const newMap = JSON.parse(JSON.stringify(map));
    for (var y = 0; y < map.length; y++) {
      for (var x = 0; x < map[0].length; x++) {
        const point = { x, y };
        const status = getSeatStatus(map, point);

        if (status[0] === 'L' && status[1].length === 0) {
          newMap[point.y][point.x] = '#';
        }

        if (status[0] === '#' && status[1].length >= 4) {
          newMap[point.y][point.x] = 'L';
        }
      }
    }

    if (JSON.stringify(newMap) === JSON.stringify(map)) {
      return getOccupied(map);
    };
    map = newMap;
  };
};

const getSeatLOS = (map, point) => {
  const current = map[point.y][point.x];
  const occNeighbours = neightbourPoints.map(v => {
    let newX = point.x + v.x;
    let newY = point.y + v.y;

    while (
      newX >= 0 && newX < map[0].length &&
      newY >= 0 && newY < map.length
    ) {
      if (map[newY][newX] === 'L') {
        return false;
      }
      if (map[newY][newX] === '#') {
        return true;
      }
      newX += v.x;
      newY += v.y;
    }

    return false;
  }).filter(Boolean);

  return [current, occNeighbours];
};

const partTwo = () => {
  let map = getMap();
  while (true) {
    const newMap = JSON.parse(JSON.stringify(map));
    for (var y = 0; y < map.length; y++) {
      for (var x = 0; x < map[0].length; x++) {
        const point = { x, y };
        const status = getSeatLOS(map, point);

        if (status[0] === 'L' && status[1].length === 0) {
          newMap[point.y][point.x] = '#';
        }

        if (status[0] === '#' && status[1].length >= 5) {
          newMap[point.y][point.x] = 'L';
        }
      }
    }

    if (JSON.stringify(newMap) === JSON.stringify(map)) {
      return getOccupied(map);
    };
    map = newMap;
  };
};
console.log("Part One");
console.log(partOne());

console.log("Part Two");
console.log(partTwo());
