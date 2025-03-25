export function sum(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}

export function subtract(...args) {
  return args.reduce((acc, curr) => acc - curr, 0);
}

export function multiply(...args) {
  return args.reduce((acc, curr) => acc * curr, 1);
}
