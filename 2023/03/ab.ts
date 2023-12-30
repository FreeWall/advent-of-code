import { readInput } from '../../utils/file';

const lines = readInput(__dirname)
  .split('\n')
  .filter((line) => !!line);

const chars = lines.map((line) => line.split(''));

type NumberObj = {
  value: number;
  coords: [number, number];
  adjacentChars: CharObj[];
};

type CharObj = {
  value: string;
  coords: [number, number];
};

function parseNumbers() {
  const numbers: NumberObj[] = [];

  lines.forEach((line, y) => {
    const regex = /\d+/g;
    let match: ReturnType<typeof regex.exec>;
    while ((match = regex.exec(line))) {
      numbers.push({
        value: Number(match[0]),
        coords: [match.index, y],
        adjacentChars: [],
      });
    }
  });

  return numbers;
}

function findAdjacentChars(x: number, y: number) {
  const regex = /[^\d\.]/;
  const foundChars: CharObj[] = [];

  checkChar(y, x - 1);
  checkChar(y, x + 1);
  checkChar(y - 1, x);
  checkChar(y - 1, x - 1);
  checkChar(y - 1, x + 1);
  checkChar(y + 1, x);
  checkChar(y + 1, x - 1);
  checkChar(y + 1, x + 1);

  function checkChar(y: number, x: number) {
    if (!chars[y]?.[x]) {
      return;
    }

    const match = chars[y][x].match(regex);
    if (match) {
      foundChars.push({
        value: match[0],
        coords: [x, y],
      });
    }
  }

  return foundChars;
}

let sumA = 0;
let sumB = 0;

const numbers = parseNumbers();
const gears: CharObj[] = [];

numbers.forEach((number) => {
  const adjacentChars: CharObj[] = [];

  for (let i = 0; i < number.value.toString().length; i++) {
    const foundChars = findAdjacentChars(
      number.coords[0] + i,
      number.coords[1],
    );
    foundChars.forEach((a) => {
      if (
        !adjacentChars.find(
          (b) => b.coords[0] == a.coords[0] && b.coords[1] == a.coords[1],
        )
      ) {
        adjacentChars.push(a);

        if (
          a.value == '*' &&
          !gears.find(
            (b) => b.coords[0] == a.coords[0] && b.coords[1] == a.coords[1],
          )
        ) {
          gears.push(a);
        }
      }
    });
  }

  number.adjacentChars = adjacentChars;

  if (adjacentChars.length > 0) {
    sumA += number.value;
  }
});

gears.forEach((gear) => {
  const foundNumbers = numbers.filter((number) => {
    return number.adjacentChars.find(
      (char) =>
        gear.coords[0] == char.coords[0] && gear.coords[1] == char.coords[1],
    );
  });

  if (foundNumbers.length == 2) {
    sumB += foundNumbers[0].value * foundNumbers[1].value;
  }
});

console.log(sumA);
console.log(sumB);
