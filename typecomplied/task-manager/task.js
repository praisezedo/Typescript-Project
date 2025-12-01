"use strict";
// access dom elements 
const inputTask = document.getElementById('task-input');
const inputDate = document.getElementById('date-input');
const addTaskBtn = document.getElementById('add-button');
const displayTaskDiv = document.getElementById('task-display');
//create a class
class TaskManager {
    constructor(task, time, id) {
        this.task = task;
        this.time = time;
        if (typeof id === 'number') {
            this.id = id;
            if (id > TaskManager.currentId)
                TaskManager.currentId = id;
        }
        else {
            this.id = ++TaskManager.currentId;
        }
    }
}
TaskManager.currentId = 0;
let tasks = [];
//add task function
function addTask() {
    const taskvalue = inputTask.value;
    const datevalue = inputDate.value;
    if (!taskvalue.trim() || !datevalue.trim())
        return;
    const task = new TaskManager(taskvalue, datevalue);
    tasks.push(task);
    displayTaskDiv.innerHTML = '';
    displayUI();
    inputTask.value = '';
    inputDate.value = '';
}
//display task in UI 
function displayUI() {
    tasks.forEach(task => {
        const template = `
                <h1>${task.task.toUpperCase()}</h1>
                <h1>${task.time}</h1>
                <button onclick="removeTask(${task.id})">Delete Task</button>
                <input type="checkbox">
        `;
        displayTaskDiv.innerHTML += template;
    });
}
//remove task by ID
function removeTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    displayUI();
}
// expose delete function globally for HTML button
addTaskBtn.addEventListener('click', addTask);
