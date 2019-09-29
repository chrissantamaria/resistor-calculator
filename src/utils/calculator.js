import resistors from './resistors';
import { permutation } from 'js-combinatorics';
import mem from 'mem';

const sum = values => values.reduce((a, b) => a + b, 0);
const parallelResistance = values => 1 / sum(values.map(val => 1 / val));
const percentError = (calc, exact) => Math.abs((calc - exact) / exact);
export const toPrecision = (value, n) => Number(value.toPrecision(n));

const getPermutations = mem(n => permutation(resistors, n).toArray());
const getAllPermutations = mem(n =>
  new Array(n)
    .fill()
    .map((_, i) => getPermutations(i + 1))
    .flat()
);

export const findClosestCombination = mem((value, n, type) => {
  const permutations = getAllPermutations(n);

  let resistorCombinations;
  if (type === 'series') {
    resistorCombinations = permutations.map(values => ({
      values,
      resistance: toPrecision(sum(values), 4)
    }));
  } else if (type === 'parallel') {
    resistorCombinations = permutations.map(values => ({
      values,
      resistance: toPrecision(parallelResistance(values), 4)
    }));
  } else {
    throw new Error('Invalid combination type, must be series or parallel');
  }

  return resistorCombinations.reduce(
    (max, current) => {
      current.error = percentError(current.resistance, value);

      if (current.error < max.error) {
        max = current;
      }
      return max;
    },
    {
      ...resistorCombinations[0],
      error: percentError(resistorCombinations[0].resistance, value)
    }
  );
});
