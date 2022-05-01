function makeDiagonalRed(table) {
  let cell = 0;
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[cell].style.backgroundColor = 'red';
    cell++;
  }
}
