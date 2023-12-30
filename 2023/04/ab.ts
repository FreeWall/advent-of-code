import { readInput } from '../../utils/file';

const lines = readInput(__dirname)
  .split('\n')
  .filter((line) => !!line);

type Card = {
  yours: number[];
  winning: number[];
};

function parseCard(value: string): Card {
  const parts = value.split('|');
  return {
    yours: parts[0]
      .split(' ')
      .filter((a) => a.length)
      .map((a) => Number(a)),
    winning: parts[1]
      .split(' ')
      .filter((a) => a.length)
      .map((a) => Number(a)),
  };
}

function getWinningNumbers(card: Card) {
  return card.yours.filter((a) => card.winning.includes(a));
}

function getWinningCards(card: Card, index: number) {
  let winningCards = 1;
  const winningNumbers = getWinningNumbers(card).length;

  for (let i = 1; i <= winningNumbers; i++) {
    if (cards[index + i]) {
      winningCards += getWinningCards(cards[index + i], index + i);
    }
  }

  return winningCards;
}

let sumA = 0;
let sumB = 0;

const cards: Card[] = [];

lines.forEach((line) => {
  const card = parseCard(line.split(':')[1]);
  cards.push(card);
});

cards.forEach((card, index) => {
  const winningNumbers = getWinningNumbers(card).length;
  const score = winningNumbers
    ? Math.pow(winningNumbers > 1 ? 2 : 1, winningNumbers - 1)
    : 0;
  sumA += score;

  sumB += getWinningCards(card, index);
});

console.log(sumA);
console.log(sumB);
