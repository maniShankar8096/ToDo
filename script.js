"use strict";
//DOM elements
const myTaskContainer = document.querySelector(".todo-items-container");
const taskInputEle = document.getElementById("todoUserInput");
const addTaskBtnEle = document.querySelector(".add-todo-button");
let deleteEle = document.querySelectorAll(".delete-icon");
let checkboxEle = document.querySelectorAll(".todo-item-container");
//main
//storage part
//getting list from local storage
const getListFromLS = function () {
  let toDoTasksJSON = localStorage.getItem("toDoTasks");
  let parsedToDoTasks = JSON.parse(toDoTasksJSON);
  if (parsedToDoTasks) {
    return parsedToDoTasks;
  } else {
    return [];
  }
};

let todoTasks = getListFromLS();
let uCount =
  todoTasks.length !== 0
    ? todoTasks[todoTasks.length - 1].uid
    : todoTasks.length;
console.log(uCount);
//displaytask function
const displayTask = function (text, uid) {
  const checkboxHTML = `<input
  type="checkbox"
  id="checkboxInput--${uid}"
  class="checkbox-input"
/>`;
  const labelContainerHTML = `<div class="d-flex flex-row label-container">
  <label for="checkboxInput--${uid}" id="label--${uid}" class="checkbox-label"
    >${text}</label
  >
  <i class="far fa-trash-alt delete-icon"></i>
</div>`;
  const taskHTML = `<li class="todo-item-container d-flex flex-row">
    ${checkboxHTML}
    ${labelContainerHTML}
  </li>`;
  myTaskContainer.insertAdjacentHTML("beforeend", taskHTML);
  return document.getElementById(`label--${uid}`);
};
//displaying tasks

/////////////////////////////////////////////////
const deleteFunc = function (HTMLCodeLabel) {
  HTMLCodeLabel.nextElementSibling.addEventListener("click", () => {
    const uid = HTMLCodeLabel.id.split("--")[1];
    const index = todoTasks.findIndex((el) => {
      if (el.uid === +uid) {
        return true;
      }
    });
    todoTasks.splice(index, 1);
    HTMLCodeLabel.closest("li").remove();
  });
};

//////////////////

//////////////////////////////////
const changeStatus = function (HTMLCodeLabel) {
  HTMLCodeLabel.closest("li").addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
      const uid = HTMLCodeLabel.id.split("--")[1];
      const index = todoTasks.findIndex((el) => {
        if (el.uid === +uid) {
          return true;
        }
      });
      todoTasks[index].isChecked = !todoTasks[index].isChecked;
      event.target.nextElementSibling.firstElementChild.classList.toggle(
        "isChecked"
      );
      event.target.nextElementSibling.classList.toggle("changedBgColor");
    }
  });
};
/////////////////
if (todoTasks.length !== 0) {
  // deleteFunc();
  todoTasks.forEach((el) => {
    const HTMLCode = displayTask(el.text, el.uid);
    changeStatus(HTMLCode);
    deleteFunc(HTMLCode);
    if (el.isChecked) {
      const labelEleChecked = document.getElementById(`label--${el.uid}`);
      const checkInpEle = document.getElementById(`checkboxInput--${el.uid}`);
      checkInpEle.checked = true;
      labelEleChecked.classList.toggle("isChecked");
      labelEleChecked.parentElement.classList.toggle("changedBgColor");
    }
  });
}
//adding the task
const addnewTask = function () {
  const task = taskInputEle.value;
  if (task) {
    uCount = uCount + 1;
    const newObj = {
      text: task,
      uid: uCount,
      isChecked: false,
    };
    todoTasks.push(newObj);
    const HTMLCodeLabel = displayTask(task, uCount);
    changeStatus(HTMLCodeLabel);
    deleteFunc(HTMLCodeLabel);
    taskInputEle.value = "";
  } else {
    alert("Please enter valid text");
  }
};
addTaskBtnEle.addEventListener("click", () => {
  addnewTask();
});
//adding using keyboard enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addnewTask();
  }
});
//saving to local storage

setInterval(() => {
  localStorage.setItem("toDoTasks", JSON.stringify(todoTasks));
}, 1000);
//deleting all
const delBtn = document.getElementById("deleteBtn");
delBtn.addEventListener("click", () => {
  localStorage.removeItem("toDoTasks");
  todoTasks = [];
  const liEle = document.querySelectorAll("li");
  liEle.forEach((el) => {
    el.remove();
  });
});
