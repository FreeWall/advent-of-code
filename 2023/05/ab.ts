import { readInput } from '../../utils/file';

const input = readInput(__dirname);

type MapBlock = {
  items: {
    destination: number;
    source: number;
    length: number;
  }[];
};

function parseMapBlock(block: string): MapBlock {
  const items: MapBlock['items'] = [];
  const lines = block.split('\n').filter((line) => !!line);
  lines.shift();
  lines.forEach((line) => {
    const parts = line.split(' ');
    items.push({
      destination: Number(parts[0]),
      source: Number(parts[1]),
      length: Number(parts[2]),
    });
  });

  return {
    items,
  };
}

function getDestination(block: MapBlock, source: number): number {
  for (let item of block.items) {
    if (source >= item.source && source <= item.source + item.length) {
      return item.destination - item.source + source;
    }
  }
  return source;
}

const seeds = input
  .split('\n')[0]
  .split(':')[1]
  .trim()
  .split(' ')
  .map((seed) => Number(seed));

const blocks: MapBlock[] = [];

input.split('\n\n').forEach((block) => {
  blocks.push(parseMapBlock(block));
});

function findDestination(source: number, blockIndex: number = 0): number {
  let destination = source;
  for (let block of blocks) {
    destination = getDestination(block, destination);
  }
  return destination;
}

let minDestinationA = Number.MAX_SAFE_INTEGER;
seeds.forEach((seed) => {
  const destination = findDestination(seed);
  if (minDestinationA > destination) {
    minDestinationA = destination;
  }
});

let minDestinationB = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < seeds.length; i += 2) {
  for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
    const destination = findDestination(j);

    if (minDestinationB > destination) {
      minDestinationB = destination;
    }
  }
}

console.log(minDestinationA);
console.log(minDestinationB);
