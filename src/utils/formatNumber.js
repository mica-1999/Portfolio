export function formatNumber(num) {
  if (num >= 10000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
