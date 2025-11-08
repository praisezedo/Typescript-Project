const inputTask = document.getElementById('input-task')! as HTMLInputElement;
const inputDate = document.getElementById('input-date')! as HTMLInputElement;

// Load from localStorage or set defaults
let tasks: { task: string; date: string }[] = JSON.parse(localStorage.getItem('tasks') || '[]');
if (tasks.length === 0) {
  tasks = [
    { task: "EAT Food", date: "2025-10-20" },
    { task: "BATH", date: "2005-11-21" }
  ];
}

let taskContainer = document.createElement('div');
taskContainer.className = "task-container";

function renderTasks() {
    tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const listHTML = tasks.map((t, i) => `
    <li>
      <h3>${t.task}</h3>
      <h3>${t.date}</h3>
      <button onclick="removeTask(${i})">Delete</button>
    </li>
  `).join('');

  taskContainer.innerHTML = `<ol id="list-of-items">${listHTML}</ol>`;
}

function addTask() {
  const itemTask = inputTask.value.trim();
  const itemDate = inputDate.value.trim();

  if (!itemTask || !itemDate) return;

  const newTask = { task: itemTask, date: itemDate };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();

  inputTask.value = "";
  inputDate.value = "";
}

function removeTask(index: number) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
document.body.append(taskContainer);

/*

// tuple
let person: {name: string , age: number , isStudent: boolean , isTechnology: boolean} = {

  name: "praise",
  age: 17,
  isStudent: true,
  isTechnology: true
}


console.log(person.name);

//enum

enum CODE {
  code_1 = 20,
  code_2 = 100,
  code_3 = 12,
  code_4 = 13
}

console.log(CODE.code_1)

//Union 

let Technology : boolean | string | undefined | null;

Technology = "yes"

//any 

let programminglangage: any;

programminglangage = true;
programminglangage = "typescript";
programminglangage = 200;

console.log(programminglangage)

// literal type 
const Name = "praise";

// type alias
type User = string;


let username: User = "praisezedo";

console.log(username)

// function return type
function Greet(name: string) : void{
    console.log(`Hello ${name}`)
}

Greet("praise");

//unknown

let isMarrying: unknown;

isMarrying = true;
isMarrying = false;
isMarrying = "no";


console.log(isMarrying) */



