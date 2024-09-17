/* let users_container = document.getElementById('users_container');
let user = document.getElementById('user');
let posts_container = document.getElementById('posts');

let user_list = [];

function getUsers() {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://jsonplaceholder.typicode.com/users');
  request.response = 'json';
  request.send();
  request.onload = () => {
    let users = JSON.parse(request.response);
    let index = 1;
    for (use of users) {
      users_container.innerHTML += `  <div onclick="clickeduser(${index})" id="user" >
      <h3>${use.name}</h3>
      <h3>${use.email}</h3>
    </div>`;
      user_list.push(use);
      index++;
    }
  };
}
getUsers();

const clickeduser = (index) => {
  user.setAttribute('class', 'selected');
  let request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://jsonplaceholder.typicode.com/posts?userId=${index}`
  );
  request.response = 'json';
  request.send();
  request.onload = () => {
    let posts = JSON.parse(request.response);
    for (pos of posts) {
      posts_container.innerHTML = ` <h3>${pos.title}</h3>
            <hr />
            <h4>
              ${pos.body}
            </h4>`;
    }
  };
  getUsers();
}; */

/* let users_container = document.getElementById('users_container');
let posts_container = document.getElementById('posts');
let user_list = [];

// Fetch users from the API
function getUsers() {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://jsonplaceholder.typicode.com/users');
  request.responseType = 'json'; // Correct responseType
  request.send();
  request.onload = () => {
    let users = request.response;
    let index = 0;
    for (let use of users) {
      users_container.innerHTML += `
      <div onclick="clickeduser(${use.id}, this)"  id="user">
        <h3>${use.name}</h3>
        <h3>${use.email}</h3>
      </div>`;
      user_list.push(use);
      index++;
    }
  };
}

getUsers();

// When a user is clicked, fetch their posts and highlight the selected user
const clickeduser = (userId, element) => {
  // Clear any previous "selected" class from other user elements
  let allUsers = document.querySelectorAll('.user');
  allUsers.forEach((user) => user.classList.remove('selected'));

  // Add "selected" class to the clicked user
  element.classList.add('selected');

  // Fetch and display the posts for the selected user
  let request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  request.responseType = 'json';
  request.send();
  request.onload = () => {
    let posts = request.response;
    posts_container.innerHTML = ''; // Clear previous posts
    if (posts.length > 0) {
      for (let post of posts) {
        posts_container.innerHTML += `
          <div>
            <h3>${post.title}</h3>
            <hr />
            <h4>${post.body}</h4>
          </div>`;
      }
    } else {
      posts_container.innerHTML = '<p>No posts available for this user.</p>';
    }
  };
};
 */

function getPosts(userId) {
  let request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://jsonplaceholder.typicode.com/posts?userId=' + userId
  );
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status <= 300) {
      let posts = request.response;
      document.getElementById('posts').innerHTML = '';
      for (pos of posts) {
        let content = ` <div id="post">
            <h3>${pos.title}</h3>
            <hr />
            <h4>${pos.body}</h4>
          </div>`;
        document.getElementById('posts').innerHTML += content;
      }
    } else {
      console.log('error');
    }
  };
}

function getUsers() {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://jsonplaceholder.typicode.com/users');
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status <= 300) {
      let users = request.response;
      document.getElementById('users').innerHTML = '';
      for (use of users) {
        let content = ` <div id="user" onclick="userClicked(${use.id}, this)">
            <h3>${use.name}</h3>
            <h3>${use.email}</h3>
          </div>`;
        document.getElementById('users').innerHTML += content;
      }
    } else {
      console.log('error');
    }
  };
}
getPosts();
getUsers();

function userClicked(id, el) {
  getPosts(id);
  let selectedElements = document.getElementsByClassName('selected');

  for (element of selectedElements) {
    element.classList.remove('selected');
  }
  el.classList.add('selected');
}
