import { readInput } from '../../utils/file';

const lines = readInput(__dirname)
  .split('\n')
  .filter((line) => !!line);

const numberLetters = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

let sum = 0;

lines.forEach((line) => {
  let first: number | undefined = undefined;
  let last: number | undefined = undefined;
  let firstIndex = Number.MAX_SAFE_INTEGER;
  let lastIndex = -1;

  line.split('').forEach((char, index) => {
    if (!char.match(/\d/)) {
      return;
    }

    if (index < firstIndex) {
      firstIndex = index;
      first = Number(char);
    }

    if (index > lastIndex) {
      lastIndex = index;
      last = Number(char);
    }
  });

  numberLetters.forEach((letter, letterNumber) => {
    let index = line.indexOf(letter);

    if (index != -1 && index < firstIndex) {
      firstIndex = index;
      first = letterNumber + 1;
    }

    index = line.lastIndexOf(letter);

    if (index != -1 && index > lastIndex) {
      lastIndex = index;
      last = letterNumber + 1;
    }
  });

  sum += Number(first + '' + last);
});

console.log(sum);
