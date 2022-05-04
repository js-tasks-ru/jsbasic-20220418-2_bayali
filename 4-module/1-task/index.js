function makeFriendsList(friends) {
  let list = document.createElement('ul');
  friends.map(item => {
    let li = document.createElement('li');
    li.textContent = `${item.firstName} ${item.lastName}`;
    list.append(li);
  })
  return list;
}
