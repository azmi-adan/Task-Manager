const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let tasks = [];

// Load tasks from localStorage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    if (taskTitle.trim() === '') {
        alert('Please enter a task title');
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskForm.reset();
});

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <button onclick="completeTask('${task.id}')">Complete</button>
            <button onclick="editTask('${task.id}')">Edit</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}

function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        displayTasks();
    }
}

function editTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate;
        tasks.splice(taskIndex, 1);
        saveTasks();
        displayTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
