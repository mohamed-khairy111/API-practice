function getUsers() {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject('error with user request');
        }
      })
      .then((json) => {
        let users = json;
        document.getElementById('users').innerHTML = '';
        for (use of users) {
          let content = ` <div id="user" onclick="userClicked(${use.id}, this)">
              <h3>${use.name}</h3>
              <h3>${use.email}</h3>
            </div>`;
          document.getElementById('users').innerHTML += content;
        }
        resolve();
      });
  });
}

function getPosts(userId) {
  fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      let posts = json;
      document.getElementById('posts').innerHTML = '';
      for (pos of posts) {
        let content = ` <div id="post">
          <h3>${pos.title}</h3>
          <hr />
          <h4>${pos.body}</h4>
        </div>`;
        document.getElementById('posts').innerHTML += content;
      }
    });
}

getUsers()
  .then(() => {
    getPosts(1);
  })
  .catch((error) => {
    console.log(error);
  });

function userClicked(id, el) {
  getPosts(id);
  let selectedElements = document.getElementsByClassName('selected');

  for (element of selectedElements) {
    element.classList.remove('selected');
  }
  el.classList.add('selected');
}
