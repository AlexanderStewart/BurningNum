import { markerBoards } from "./Boards";

const UpdateMarkers = (tiles, level, todaysBoards) => {

  const myTileMarkers = [];

  let leftA = 0;
  let topA = 0;
  let leftB = 0;
  let topB = 0;
  let leftC = 0;
  let topC = 0;

  for (let i = 0; i < tiles.length; i++) {
    const index = tiles[i].index;
    const val = tiles[i].value;

    if (index === 0 || index === 1 || index === 2) leftA += val;
    if (index === 3 || index === 4 || index === 5) leftB += val;
    if (index === 6 || index === 7 || index === 8) leftC += val;

    if (index === 0 || index === 3 || index === 6) topA += val;
    if (index === 1 || index === 4 || index === 7) topB += val;
    if (index === 2 || index === 5 || index === 8) topC += val;
  }

  for (let i = 0; i < 25; i++) {

    let currentValue;

    // Top
    if (i === 1) currentValue = topA;
    if (i === 2) currentValue = topB;
    if (i === 3) currentValue = topC;

    // Bottom
    if (i === 21) currentValue = topA;
    if (i === 22) currentValue = topB;
    if (i === 23) currentValue = topC;

    // Left
    if (i === 5) currentValue = leftA;
    if (i === 10) currentValue = leftB;
    if (i === 15) currentValue = leftC;

    // Right
    if (i === 9) currentValue = leftA;
    if (i === 14) currentValue = leftB;
    if (i === 19) currentValue = leftC;

    const goalValue = markerBoards(level, i, todaysBoards);

    myTileMarkers.push({ goalValue: goalValue, currentValue: currentValue });
  }

  return myTileMarkers;
};

export default UpdateMarkers;