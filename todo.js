const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const clearButton = document.getElementById('clear-btn');


window.addEventListener('DOMContentLoaded', loadTasks);


addButton.addEventListener('click', () => {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    addTask(taskText);
    saveTask(taskText, false);
    inputBox.value = '';
});

clearButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
      taskList.innerHTML = '';
      localStorage.removeItem('tasks');
  }
});

function addTask(text, completed = false) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.classList.add('task-checkbox');

    const span = document.createElement('span');
    span.textContent = text;

    if (completed) {
        span.classList.add('completed');
    }

    checkbox.addEventListener('change', () => {
        span.classList.toggle('completed');
        updateStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(span);

    taskList.appendChild(li);


    li.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        li.remove();
        updateStorage();
    });
}

function saveTask(text, completed) {
    const tasks = getSavedTasks();
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getSavedTasks();
    tasks.forEach(task => addTask(task.text, task.completed));
}

function updateStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('.task-checkbox');
        const span = li.querySelector('span');
        tasks.push({
            text: span.textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getSavedTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}


