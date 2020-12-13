import { readFile } from '../utils/fileParser.js';

const getTimes = () => {
  const [arrival, times] = readFile('./day_13/input.txt');

  return {
    arrival: parseInt(arrival),
    times: times.split(',')
      .map(Number)
  }
};

const partOne = () => {
  const { arrival, times } = getTimes();

  for (var i = arrival; i < arrival + 1000; i++) {
    const divisible = times.filter(v => i % v === 0);

    if (divisible.length > 0) {
      return (i - arrival) * divisible[0];
    }
  }
};

const partTwo = () => {
  const { times } = getTimes();
  const buses = times
    .reduce((acc, time, index) => {
      if (Boolean(time)) {
        acc.push({
          time,
          offset: index
        });
      }

      return acc;
    }, [])
    .sort((a, b) => b.time - a.time);

  const product = buses.map(v => v.time).reduce((a, b) => a * b);

  var inc = buses[0].time;
  for (let candidate = 100000000000000; candidate < product; candidate += inc) {
    const busesInCanon = buses
      .filter(bus => (candidate + bus.offset) % bus.time === 0)
      .map(v => v.time);

    if (buses.length === busesInCanon.length) {
      return candidate;
    }

    /**
      * Start incrementing by the largest bus time.
      * Then when the next bus is matched, increment by the LCM of those 2 bus times.
      * So on for each subsequent matched bus
      */
    if (busesInCanon.length > 1) {
      const gcd = (a, b) => a ? gcd(b % a, a) : b;
      const lcm = busesInCanon.reduce((a, b) => (a * b) / gcd(a, b));
      inc = lcm;
    }
  }
};

console.log("Part One");
console.log(partOne());

console.log("Part Two");
console.log(partTwo());
