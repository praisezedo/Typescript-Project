// access dom elements 
const inputTask = document.getElementById('task-input')! as HTMLInputElement;
const inputDate = document.getElementById('date-input')! as HTMLInputElement;
const addTaskBtn = document.getElementById('add-button')! as HTMLButtonElement;
const displayTaskDiv = document.getElementById('task-display')! as HTMLDivElement;

// interface 
interface taskModel {
    task: string;
    time: string;
    id: number;
}

// class
class TaskManager implements taskModel {
    public task: string;
    public time: string;
    readonly id: number;
    public static currentId: number = 0;

    constructor(task: string, time: string, id?: number) {
        this.task = task;
        this.time = time;

        if (typeof id === 'number') {
            this.id = id;
        } else {
            this.id = ++TaskManager.currentId;
        }
    }
}

// load tasks from localstorage
let tasks: taskModel[] = JSON.parse(localStorage.getItem('tasks') || '[]');

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

    if (!taskvalue.trim() || !datevalue.trim()) return;

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
function removeTask(id: number) {
    tasks = tasks.filter(t => t.id !== id);

    saveToLocal();  
    displayTaskDiv.innerHTML = '';
    displayUI();
}

(window as any).removeTask = removeTask;

addTaskBtn.addEventListener('click', addTask);

// load UI on page load
displayUI();
