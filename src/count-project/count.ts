const display = document.querySelector('.display')! as HTMLHeadingElement;
const addBtn = document.querySelector('.add-btn')! as HTMLButtonElement;
const subBtn = document.querySelector('.sub-btn')! as HTMLButtonElement;
const resetBtn = document.querySelector('.reset-btn')! as HTMLButtonElement;
const saveDisplay = document.querySelector('.saved-count')! as HTMLSpanElement;
let count : number = 0;
let fixed : number = 0;
   function i() {
     count = count + 1;
 if(typeof display.innerHTML !== null) {
    display.innerHTML = count.toString()
 }
 else {
    return;
 }
   } 
   function d() {
    count = count - 1;
     if(typeof display.innerHTML !== null) {
    display.innerHTML = count.toString();
        if(count <= 0) {
            count = 0;
         display.innerHTML = fixed.toString();
    }
 }
 else {
    return;
 }
   }
   function r() {
   count = 0;
    if(typeof display.innerHTML !== null) {
    display.innerHTML = count.toString()
 }
 else {
    return;
 }
   }

   function s() {
    let savedCount:number = count;
saveDisplay.innerHTML = savedCount.toString();
   }
   