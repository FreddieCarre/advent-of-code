import { readFile } from '../utils/fileParser.js';

const getMap = () => {
  return readFile('./day_12/input.txt')
    .filter(Boolean)
    .map(v => /([A-z])(\d+)/.exec(v).slice(1,3))
    .map(([d, m]) => [d, parseInt(m)]);
};

const compass = ['N', 'E', 'S', 'W'];

class Ship {
  constructor() {
    this.direction = 'E';
    this.position = [0,0];
  };

  move(direction, distance) {
    switch (direction) {
      case 'F':
        this.move(this.direction, distance);
        break;
      case 'N':
        this.position = [this.position[0] + distance, this.position[1]];
        break;
      case 'E':
        this.position = [this.position[0], this.position[1] + distance];
        break;
      case 'S':
        this.position = [this.position[0] - distance, this.position[1]];
        break;
      case 'W':
        this.position = [this.position[0], this.position[1] - distance];
        break;
      case 'L':
        this.rotate(-1 * distance);
        break;
      case 'R':
        this.rotate(distance);
        break;
    };
  };

  rotate(distance) {
    let newIndex = (compass.indexOf(this.direction) + (distance / 90));
    newIndex = newIndex >= compass.length ? newIndex % compass.length : newIndex;
    newIndex = newIndex < 0 ? compass.length + newIndex : newIndex;
    this.direction = compass[newIndex];
  }

  manhattan() {
    return this.position.reduce((a, b) => Math.abs(a) + Math.abs(b));
  }
};

class WaypointShip extends Ship {
  constructor() {
    super();
    this.waypoint = [1, 10];
  }

  move(direction, distance) {
    switch (direction) {
      case 'F':
        this.position = this.position.map((x, i) => (distance * this.waypoint[i]) + x);
        break;
      case 'N':
        this.waypoint = [this.waypoint[0] + distance, this.waypoint[1]];
        break;
      case 'E':
        this.waypoint = [this.waypoint[0], this.waypoint[1] + distance];
        break;
      case 'S':
        this.waypoint = [this.waypoint[0] - distance, this.waypoint[1]];
        break;
      case 'W':
        this.waypoint = [this.waypoint[0], this.waypoint[1] - distance];
        break;
      case 'L':
        this.rotate(360 - distance);
        break;
      case 'R':
        this.rotate(distance);
        break;
    };
  }

  rotate(distance) {
    const quarters = (distance / 90) % 4;

    switch (quarters) {
      case 0:
        // no-op
        break;
      case 1:
        this.waypoint = [-this.waypoint[1], this.waypoint[0]];
        break;
      case 2:
        this.waypoint = [-this.waypoint[0], -this.waypoint[1]];
        break;
      case 3:
        this.waypoint = [this.waypoint[1], -this.waypoint[0]];
        break;
      default:
        console.log(distance, 'default in rotate?');
        break;
    };
  };
};

const partOne = () => {
  const ship = new Ship();
  getMap()
    .forEach(movement => {
      ship.move(...movement);
    });

  return ship.manhattan();
};

const partTwo = () => {
  const ship = new WaypointShip();
  getMap()
    .forEach(movement => {
      ship.move(...movement);
    });

  return ship.manhattan();
};

console.log("Part One");
console.log(partOne());

console.log("Part Two");
console.log(partTwo());
