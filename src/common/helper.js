export const formatDecimal = (num) => {
  return Number(num.toFixed(0)).toLocaleString().split(/\s/).join(",");
};
