function isEmpty(obj) {
  let count = 0;
  for (key in obj) {
    count++;
  }
  if(count){
    return false;
  } return true;
}
