const tileBoards = (level, i) => {


  if (level === 1) {
    if (i === 0) return 0;
    if (i === 1) return 0;
    if (i === 2) return 0;

    if (i === 3) return 0;
    if (i === 4) return 1;
    if (i === 5) return 0;

    if (i === 6) return 0;
    if (i === 7) return 0;
    if (i === 8) return 0;
  }

  if (level === 2) {
    if (i === 0) return 0;
    if (i === 1) return 2;
    if (i === 2) return 0;

    if (i === 3) return 1;
    if (i === 4) return 1;
    if (i === 5) return 0;

    if (i === 6) return 0;
    if (i === 7) return 3;
    if (i === 8) return 2;
  }

  if (level === 3) {
    if (i === 0) return 4;
    if (i === 1) return 0;
    if (i === 2) return 1;

    if (i === 3) return 2;
    if (i === 4) return 4;
    if (i === 5) return 1;

    if (i === 6) return 0;
    if (i === 7) return 0;
    if (i === 8) return 0;
  }


  if (level === 4) {
    if (i === 0) return 4;
    if (i === 1) return 3;
    if (i === 2) return 0;

    if (i === 3) return 0;
    if (i === 4) return 2;
    if (i === 5) return 0;

    if (i === 6) return 2;
    if (i === 7) return 2;
    if (i === 8) return 0;
  }

  if (level === 5) {
    if (i === 0) return 6;
    if (i === 1) return 6;
    if (i === 2) return 0;

    if (i === 3) return 0;
    if (i === 4) return 3;
    if (i === 5) return 0;

    if (i === 6) return 0;
    if (i === 7) return 3;
    if (i === 8) return 6;
  }

  if (level === 6) {
    if (i === 0) return 1;
    if (i === 1) return 1;
    if (i === 2) return 1;

    if (i === 3) return 0;
    if (i === 4) return 2;
    if (i === 5) return 0;

    if (i === 6) return 0;
    if (i === 7) return 1;
    if (i === 8) return 2;
  }
};

const markerBoards = (level, i) => {


  if (level === 1) {
    // Top
    if (i === 1) return 0;
    if (i === 2) return 0;
    if (i === 3) return 1;

    // Bottom
    if (i === 21) return 0;
    if (i === 22) return 0;
    if (i === 23) return 1;

    // Left
    if (i === 5) return 0;
    if (i === 10) return 1;
    if (i === 15) return 0;

    // Right
    if (i === 9) return 0;
    if (i === 14) return 1;
    if (i === 19) return 0;
  }

  if (level === 2) {
    // Top
    if (i === 1) return 2;
    if (i === 2) return 2;
    if (i === 3) return 5;

    // Bottom
    if (i === 21) return 2;
    if (i === 22) return 2;
    if (i === 23) return 5;

    // Left
    if (i === 5) return 2;
    if (i === 10) return 0;
    if (i === 15) return 7;

    // Right
    if (i === 9) return 2;
    if (i === 14) return 0;
    if (i === 19) return 7;
  }

  if (level === 3) {
    // Top
    if (i === 1) return 0;
    if (i === 2) return 10;
    if (i === 3) return 2;

    // Bottom
    if (i === 21) return 0;
    if (i === 22) return 10;
    if (i === 23) return 2;

    // Left
    if (i === 5) return 4;
    if (i === 10) return 0;
    if (i === 15) return 8;

    // Right
    if (i === 9) return 4;
    if (i === 14) return 0;
    if (i === 19) return 8;
  }


  if (level === 4) {
    // Top
    if (i === 1) return 2;
    if (i === 2) return 0;
    if (i === 3) return 11;

    // Bottom
    if (i === 21) return 2;
    if (i === 22) return 0;
    if (i === 23) return 11;

    // Left
    if (i === 5) return 7;
    if (i === 10) return 2;
    if (i === 15) return 4;

    // Right
    if (i === 9) return 7;
    if (i === 14) return 2;
    if (i === 19) return 4;
  }

  if (level === 5) {
    // Top
    if (i === 1) return 6;
    if (i === 2) return 0;
    if (i === 3) return 18;

    // Bottom
    if (i === 21) return 6;
    if (i === 22) return 0;
    if (i === 23) return 18;

    // Left
    if (i === 5) return 12;
    if (i === 10) return 12;
    if (i === 15) return 0;

    // Right
    if (i === 9) return 12;
    if (i === 14) return 12;
    if (i === 19) return 0;
  }

  if (level === 6) {
    // Top
    if (i === 1) return 0;
    if (i === 2) return 5;
    if (i === 3) return 3;

    // Bottom
    if (i === 21) return 0;
    if (i === 22) return 5;
    if (i === 23) return 3;

    // Left
    if (i === 5) return 5;
    if (i === 10) return 3;
    if (i === 15) return 0;

    // Right
    if (i === 9) return 5;
    if (i === 14) return 3;
    if (i === 19) return 0;
  }
};

export { tileBoards, markerBoards };