const tileBoards = (level, i, todaysBoards) => {
  if (level === 1) {
    if (i === 0) return todaysBoards?.boardA.inner.tile0;
    if (i === 1) return todaysBoards?.boardA.inner.tile1;
    if (i === 2) return todaysBoards?.boardA.inner.tile2;

    if (i === 3) return todaysBoards?.boardA.inner.tile3;
    if (i === 4) return todaysBoards?.boardA.inner.tile4;
    if (i === 5) return todaysBoards?.boardA.inner.tile5;

    if (i === 6) return todaysBoards?.boardA.inner.tile6;
    if (i === 7) return todaysBoards?.boardA.inner.tile7;
    if (i === 8) return todaysBoards?.boardA.inner.tile8;
  }

  if (level === 2) {
    if (i === 0) return todaysBoards?.boardB.inner.tile0;
    if (i === 1) return todaysBoards?.boardB.inner.tile1;
    if (i === 2) return todaysBoards?.boardB.inner.tile2;

    if (i === 3) return todaysBoards?.boardB.inner.tile3;
    if (i === 4) return todaysBoards?.boardB.inner.tile4;
    if (i === 5) return todaysBoards?.boardB.inner.tile5;

    if (i === 6) return todaysBoards?.boardB.inner.tile6;
    if (i === 7) return todaysBoards?.boardB.inner.tile7;
    if (i === 8) return todaysBoards?.boardB.inner.tile8;
  }

  if (level === 3) {
    if (i === 0) return todaysBoards?.boardC.inner.tile0;
    if (i === 1) return todaysBoards?.boardC.inner.tile1;
    if (i === 2) return todaysBoards?.boardC.inner.tile2;

    if (i === 3) return todaysBoards?.boardC.inner.tile3;
    if (i === 4) return todaysBoards?.boardC.inner.tile4;
    if (i === 5) return todaysBoards?.boardC.inner.tile5;

    if (i === 6) return todaysBoards?.boardC.inner.tile6;
    if (i === 7) return todaysBoards?.boardC.inner.tile7;
    if (i === 8) return todaysBoards?.boardC.inner.tile8;
  }
};

const markerBoards = (level, i, todaysBoards) => {

  if (level === 1) {
    // Top
    if (i === 1) return todaysBoards?.boardA.outer.top.A;
    if (i === 2) return todaysBoards?.boardA.outer.top.B;
    if (i === 3) return todaysBoards?.boardA.outer.top.C;

    // Bottom
    if (i === 21) return todaysBoards?.boardA.outer.top.A;
    if (i === 22) return todaysBoards?.boardA.outer.top.B;
    if (i === 23) return todaysBoards?.boardA.outer.top.C;

    // Left
    if (i === 5) return todaysBoards?.boardA.outer.left.A;
    if (i === 10) return todaysBoards?.boardA.outer.left.B;
    if (i === 15) return todaysBoards?.boardA.outer.left.C;

    // Right
    if (i === 9) return todaysBoards?.boardA.outer.left.A;
    if (i === 14) return todaysBoards?.boardA.outer.left.B;
    if (i === 19) return todaysBoards?.boardA.outer.left.C;
  }

  if (level === 2) {
    // Top
    if (i === 1) return todaysBoards?.boardB.outer.top.A;
    if (i === 2) return todaysBoards?.boardB.outer.top.B;
    if (i === 3) return todaysBoards?.boardB.outer.top.C;

    // Bottom
    if (i === 21) return todaysBoards?.boardB.outer.top.A;
    if (i === 22) return todaysBoards?.boardB.outer.top.B;
    if (i === 23) return todaysBoards?.boardB.outer.top.C;

    // Left
    if (i === 5) return todaysBoards?.boardB.outer.left.A;
    if (i === 10) return todaysBoards?.boardB.outer.left.B;
    if (i === 15) return todaysBoards?.boardB.outer.left.C;

    // Right
    if (i === 9) return todaysBoards?.boardB.outer.left.A;
    if (i === 14) return todaysBoards?.boardB.outer.left.B;
    if (i === 19) return todaysBoards?.boardB.outer.left.C;
  }

  if (level === 3) {
    // Top
    if (i === 1) return todaysBoards?.boardC.outer.top.A;
    if (i === 2) return todaysBoards?.boardC.outer.top.B;
    if (i === 3) return todaysBoards?.boardC.outer.top.C;

    // Bottom
    if (i === 21) return todaysBoards?.boardC.outer.top.A;
    if (i === 22) return todaysBoards?.boardC.outer.top.B;
    if (i === 23) return todaysBoards?.boardC.outer.top.C;

    // Left
    if (i === 5) return todaysBoards?.boardC.outer.left.A;
    if (i === 10) return todaysBoards?.boardC.outer.left.B;
    if (i === 15) return todaysBoards?.boardC.outer.left.C;

    // Right
    if (i === 9) return todaysBoards?.boardC.outer.left.A;
    if (i === 14) return todaysBoards?.boardC.outer.left.B;
    if (i === 19) return todaysBoards?.boardC.outer.left.C;
  }
};

export { tileBoards, markerBoards };