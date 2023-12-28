import { readInput } from '../../utils/file';

const lines = readInput(__dirname)
  .split('\n')
  .filter((line) => !!line)
  .map((line) => line.split(''));

let sum = 0;

lines.forEach((line) => {
  let first: string | undefined = undefined;
  let last: string | undefined = undefined;

  line.forEach((char) => {
    if (!char.match(/\d/)) {
      return;
    }

    if (first == undefined) first = char;
    last = char;
  });

  if (!first || !last) {
    return;
  }

  sum += Number(first + last);
});

console.log(sum);
