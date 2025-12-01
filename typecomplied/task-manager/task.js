"use strict";
// access dom elements 
const inputTask = document.getElementById('task-input');
const inputDate = document.getElementById('date-input');
const addTaskBtn = document.getElementById('add-button');
const displayTaskDiv = document.getElementById('task-display');
// class
class TaskManager {
    constructor(task, time, id) {
        this.task = task;
        this.time = time;
        if (typeof id === 'number') {
            this.id = id;
        }
        else {
            this.id = ++TaskManager.currentId;
        }
    }
}
TaskManager.currentId = 0;
// load tasks from localstorage
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
// reset current ID based on stored tasks
if (tasks.length > 0) {
    TaskManager.currentId = Math.max(...tasks.map(t => t.id));
}
// SAVE TASKS TO LOCALSTORAGE
function saveToLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// add task
function addTask() {
    const taskvalue = inputTask.value;
    const datevalue = inputDate.value;
    if (!taskvalue.trim() || !datevalue.trim())
        return;
    const task = new TaskManager(taskvalue, datevalue);
    tasks.push(task);
    saveToLocal();
    displayTaskDiv.innerHTML = '';
    displayUI();
    inputTask.value = '';
    inputDate.value = '';
}
// display UI
function displayUI() {
    displayTaskDiv.innerHTML = '';
    tasks.forEach(task => {
        const template = `
            <h1>${task.task.toUpperCase()}</h1>
            <h1>${task.time}</h1>
            <button onclick="removeTask(${task.id})">Delete Task</button>
        `;
        displayTaskDiv.innerHTML += template;
    });
}
// remove task
function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToLocal();
    displayTaskDiv.innerHTML = '';
    displayUI();
}
window.removeTask = removeTask;
addTaskBtn.addEventListener('click', addTask);
// load UI on page load
displayUI();
