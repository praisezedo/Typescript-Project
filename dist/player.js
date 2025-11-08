"use strict";
const inputTask = document.getElementById('input-task');
const inputDate = document.getElementById('input-date');
let tasks = [{ task: "EAT Food", date: "2025-10-20" }, { task: "BATH", date: "2005-11-21" }];
let index = tasks.length - 1;
const storedTasks = localStorage.getItem('tasks');
let taskContainer = document.createElement('div');
taskContainer.className = "task-container";
taskContainer.innerHTML = `
<ol id="list-of-items">
${tasks.map((t, index) => {
    return `<li><h3>${t.task}</h3><h3>${t.date}</h3><button onclick="removeTask(${index})">Delete</button></li>`;
}).join('')}
</ol>
`;
document.body.append(taskContainer);
// add task 
function addTask() {
    let Items = document.querySelector('ol');
    let itemTask = inputTask.value;
    let itemDate = inputDate.value;
    let it = document.createElement('li');
    it.innerHTML = `<h3>${itemTask}</h3><h3>${itemDate}</h3><button onclick="removeTask(${index})" class="bg-red-700">Delete</button>`;
    let its = { task: itemTask, date: itemDate };
    tasks.push(its);
    Items.append(it);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputTask.value = "";
    inputDate.value = "";
}
// remove task
function removeTask(index) {
    tasks.splice(index, 1);
    const Items = document.getElementById('list-of-items');
    Items.innerHTML = `
${tasks.map((t, i) => {
        return `<li><h3>${t.task}</h3><h3>${t.date}</h3><button onclick="removeTask(${i})">Delete</button></li>`;
    })}`;
}
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
