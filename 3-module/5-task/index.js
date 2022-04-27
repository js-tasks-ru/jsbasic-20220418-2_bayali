function getMinMax(str) {
  let arr = str
                    .split(' ')
                    .filter(item => Number(item))
                    .map(item => Number(item));

  return {
    min:Math.min(...arr),
    max:Math.max(...arr)
  }
}
