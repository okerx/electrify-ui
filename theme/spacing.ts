import { Theme } from '@emotion/react';

const SCALING_FACTOR = 0.25; // rem

/**
 * Use the `theme.spacing()` helper to create consistent spacing between the elements.
 * We use 0.25rem factor by default.
 * For instance, `theme.spacing(2)` will result 2 * 0.25 = 0.5rem
 * */
const spacing: Theme['spacing'] = (val1 = 1, val2, val3, val4) => {
  let s = '';

  [val1, val2, val3, val4].forEach((val, index) => {
    if (val) {
      const value =
        typeof val === 'number' ? `${SCALING_FACTOR * val}rem` : val;

      if (index === 0) s += value;
      else s += ` ${value}`;
    }
  });

  return s;
};

export default spacing;
