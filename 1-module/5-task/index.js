function truncate(str, maxlength) {
  if (str.length < maxlength) {
    return str;
  } else return str.substring(0, maxlength - 1) + '…'
}
