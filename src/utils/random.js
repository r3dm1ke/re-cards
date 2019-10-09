export const shuffle = (a) => {
  // eslint-disable-next-line fp/no-loops,fp/no-mutation
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line fp/no-mutation
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const pick_random = (a) => a[Math.floor(Math.random() * (a.length + 1))];
