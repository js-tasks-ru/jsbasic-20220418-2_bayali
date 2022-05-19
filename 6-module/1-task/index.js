/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.createTable(rows);
    this.removeRow();
  }

  createTable(rows) {
    let table = document.createElement('table');
    table.innerHTML = '<thead><tr>' +
      '<th>Имя</th>' +
      '<th>Возраст</th>' +
      '<th>Зарплата</th>' +
      '<th>Город</th>' +
      '<th></th>' +
      '</tr></thead>';

    let tbody = document.createElement('tbody');

    rows.map(item => {
      let row = `<tr>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.salary}</td>
      <td>${item.city}</td>
      <td><button>X</button></td>
      </tr>`;
      tbody.insertAdjacentHTML('beforeend', row);
    });

    table.append(tbody);
    return table;
  }

  removeRow() {
    let table = this.elem;
    table.addEventListener('click', (event) => event.target.tagName === 'BUTTON' && event.target.closest('tr').remove());
  }
}
