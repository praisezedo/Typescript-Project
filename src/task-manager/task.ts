// access dom elements 
const inputTask = document.getElementById('task-input')! as HTMLInputElement;
const inputDate = document.getElementById('date-input')! as HTMLInputElement;
const addTaskBtn = document.getElementById('add-button')! as HTMLButtonElement;
const displayTaskDiv = document.getElementById('task-display')! as HTMLDivElement;

// create an interface 
interface taskModel {
    task: string;
    time: string;
    id: number;
}

//create a class
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
            if (id > TaskManager.currentId) TaskManager.currentId = id;
        } else {
            this.id = ++TaskManager.currentId;
        }
    }
}

let tasks: taskModel[] = [];  

//add task function
function addTask() {
    const taskvalue = inputTask.value;
    const datevalue = inputDate.value;

    if (!taskvalue.trim() || !datevalue.trim()) return;

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
function removeTask(id: number) {
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
    }
    displayUI();
}

// expose delete function globally for HTML button
addTaskBtn.addEventListener('click', addTask);
