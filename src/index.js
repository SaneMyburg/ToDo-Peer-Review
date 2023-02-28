import './style.css';
import Store from './storage.js';
import Render from './displaytodo.js';
import editTask from './edit.js';
import updateStatus from './check.js';

// Display Tasks
window.addEventListener('load', (Render.displayTasks));
// Adding Task
document.querySelector('.list-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const userTask = document.querySelector('#add-list').value.trim();
  const tasks = Store.getToDos();
  const id = Math.floor(Math.random() * 1000);
  const newtask = {
    description: userTask, completed: false, index: tasks.length + 1, id,
  };
  Render.addTasks(newtask);
  Store.addNewTask(newtask);
  Store.clearInput();
});

document.querySelector('.to-do-task').addEventListener('click', (event) => {
  // Edit ToDo
  if (event.target.classList.contains('p-element')) {
    editTask(e.target);
  // Remove Task
  } else if (event.target.tagName === 'I') {
    Store.removeTask(event.target);
    Render.deleteTask(event.target);

    // Checked Tasks
  } else if (event.target.className === 'check') {
    updateStatus(e.target);
    if (event.target.checked) {
      event.target.nextElementSibling.style.textDecoration = 'line-through';
    } else {
      event.target.nextElementSibling.style.textDecoration = 'none';
    }
  }
});

// Remove all completed

document.querySelector('.clear-all').addEventListener('click', (event) => {
  event.preventDefault();
  let tasks = Store.getToDos();
  tasks = tasks.filter((todo) => todo.completed === false);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.reload();
});