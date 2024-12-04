/* Generic funciton to shuffle array */

const shuffleArray = <T>(array: T[]): T[] => {
  const copy = [...array]; // Create a shallow copy
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default shuffleArray;
