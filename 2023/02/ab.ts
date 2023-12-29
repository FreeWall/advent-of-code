import { readInput } from '../../utils/file';

const lines = readInput(__dirname)
  .split('\n')
  .filter((line) => !!line);

const cubeTypes = ['red', 'green', 'blue'] as const;

type Cube = (typeof cubeTypes)[number];

type Cubes = {
  count: number;
  type: Cube;
};

type CubeSet = Cubes[];

type Game = CubeSet[];

const validBagCubeTypeCounts: Record<Cube, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function getGameCubeTypeMaxs(game: Game) {
  const sumCubeTypes: Record<Cube, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };

  game.forEach((cubeset) => {
    cubeset.forEach((cubes) => {
      sumCubeTypes[cubes.type] = Math.max(
        cubes.count,
        sumCubeTypes[cubes.type],
      );
    });
  });

  return sumCubeTypes;
}

function isGameValid(game: Game) {
  const sums = getGameCubeTypeMaxs(game);

  for (const cubeType of cubeTypes) {
    if (
      sums[cubeType] > 0 &&
      sums[cubeType] > validBagCubeTypeCounts[cubeType]
    ) {
      return false;
    }
  }

  return true;
}

function parseGame(value: string): Game {
  return value.split(';').map((cubeset) =>
    cubeset
      .trim()
      .split(',')
      .map((cubes) => ({
        count: Number(cubes.trim().split(' ')[0].trim()),
        type: cubes.trim().split(' ')[1].trim() as Cube,
      })),
  );
}

let sumA = 0;
let sumB = 0;

lines.forEach((line) => {
  const gameId = Number(line.match(/Game (\d+):/)?.[1]);
  const game = parseGame(line.split(':')[1]);
  const sums = getGameCubeTypeMaxs(game);

  sumB += sums.red * sums.green * sums.blue;

  if (isGameValid(game)) {
    sumA += gameId;
  }
});

console.log(sumA);
console.log(sumB);
