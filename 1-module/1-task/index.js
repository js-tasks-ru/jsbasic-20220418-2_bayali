function factorial(n) {
  let answer = 1;
  if (n == 1 || n == 0) return answer;
  while (n >= 1) {
    answer *= n;
    n--;
  }
  return answer;
}
