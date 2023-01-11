const NextTo = (indexA, indexB) => {

  if (!indexA || !indexB) return false;

  if (indexA === 1) {
    if (indexB === 2) return true;
    if (indexB === 4) return true;
    return false;
  }

  if (indexA === 2) {
    if (indexB === 1) return true;
    if (indexB === 3) return true;
    return false;
  }

  if (indexA === 3) {
    if (indexB === 2) return true;
    if (indexB === 6) return true;
    return false;
  }

  if (indexA === 4) {
    if (indexB === 1) return true;
    if (indexB === 5) return true;
    if (indexB === 7) return true;
    return false;
  }

  if (indexA === 5) {
    if (indexB === 2) return true;
    if (indexB === 4) return true;
    if (indexB === 6) return true;
    if (indexB === 8) return true;
    return false;
  }

  if (indexA === 6) {
    if (indexB === 3) return true;
    if (indexB === 5) return true;
    if (indexB === 9) return true;
    return false;
  }

  if (indexA === 7) {
    if (indexB === 4) return true;
    if (indexB === 8) return true;
    return false;
  }

  if (indexA === 8) {
    if (indexB === 5) return true;
    if (indexB === 7) return true;
    if (indexB === 9) return true;
    return false;
  }

  if (indexA === 9) {
    if (indexB === 6) return true;
    if (indexB === 8) return true;
    return false;
  }

  return false;
};

export default NextTo;