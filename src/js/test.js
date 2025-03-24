export default function sum2(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
