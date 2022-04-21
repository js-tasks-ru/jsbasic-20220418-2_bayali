function sumSalary(salaries) {
  let answer = 0;
  for(key in salaries) {
    if(typeof(salaries[key]) === 'number' && isFinite(salaries[key])) {
      answer += salaries[key];
    }
  }
  return answer;
}
