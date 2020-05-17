//Creating my variables
var todos;
var date;
var value;

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");
const deleteTodo = document.querySelectorAll(".removing-elm");
const modalWindow = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const confirmBtn = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancel");
const closeBtn = document.getElementsByClassName("close")[0];

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", emptyInput);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
for (var i = 0; i < deleteTodo.length; i++) {
  deleteTodo[i].addEventListener("click", removeTodo);
}
closeBtn.addEventListener("click", function () {
  modalWindow.style.display = "none";
});

//Functions
function emptyInput(event) {
  //Prevent form from submitting
  event.preventDefault();

  if (!todoInput.value) {
    return;
  } else {
    addTodo();
  }
}

//Create Todo
function addTodo() {
  //Set date for ID
  date = new Date().getTime();

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.classList.add("uncomplete");
  todoDiv.setAttribute("id", date);

  //Edit mark button
  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn", "fas", "fa-edit");
  editButton.setAttribute("title", "Double Click to edit");
  todoDiv.appendChild(editButton);

  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText =
    todoInput.value.charAt(0).toUpperCase() + todoInput.value.slice(1);
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("contenteditable", false);
  todoDiv.appendChild(newTodo);

  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn", "fas", "fa-check");
  completedButton.setAttribute("title", "Click to complete/uncomplete");
  todoDiv.appendChild(completedButton);

  //Delete mark button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn", "fas", "fa-trash");
  trashButton.setAttribute("title", "Click to delete task");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //Add Todo to localStorage
  let todoItem = {
    id: date,
    value: todoInput.value.charAt(0).toUpperCase() + todoInput.value.slice(1),
    class: "uncomplete",
  };
  saveLocalTodos(todoItem);

  // Clear input value
  todoInput.value = "";
}

//Remove/check todo in HTML
function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentNode;

  //Delete todo
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Edit todo
  if (item.classList[0] === "edit-btn") {
    if (
      JSON.parse(item.nextSibling.getAttribute("contenteditable")) === false
    ) {
      item.nextSibling.setAttribute("contenteditable", true);
      value = item.nextSibling.innerHTML;
      console.log(value);
    } else {
      item.title = "Cliquer pour valider l'édition";
      item.nextSibling.setAttribute("contenteditable", false);
      console.log(value);
      if (value !== item.nextSibling.innerHTML) {
        editLocalStorage(todo);
      }
    }
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    console.log(item.parentNode.classList[1]);
    if (todo.classList[1] === "uncomplete") {
      todo.classList.remove("uncomplete");
      todo.classList.add("completed");
    } else {
      todo.classList.remove("completed");
      todo.classList.add("uncomplete");
    }

    completeLocalTodos(todo);
  }
}

//Show type of todo (completed, uncompleted, all)
function filterTodo(e) {
  const eachTodo = todoList.childNodes;

  eachTodo.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Save todo to LocalStorage
function saveLocalTodos(todo) {
  //check localstorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Getting todos from LocalStorage
function getTodos() {
  //check localstorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add(todo.class);
    todoDiv.setAttribute("id", todo.id);

    //Edit mark button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn", "fas", "fa-edit");
    editButton.setAttribute("title", "Click to edit task");
    todoDiv.appendChild(editButton);

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.value;
    newTodo.classList.add("todo-item");
    newTodo.setAttribute("contenteditable", false);
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn", "fas", "fa-check");
    completedButton.setAttribute("title", "Click to complete/uncomplete");
    todoDiv.appendChild(completedButton);

    //Delete mark button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn", "fas", "fa-trash");
    trashButton.setAttribute("title", "Click to delete task");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
  });
}

//Remove todo in LocalStorage
function removeLocalTodos(todo) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === parseFloat(todo.id)) {
      todos.splice(i, 1);
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Edit in LocalStorage
function editLocalStorage(todo) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === parseFloat(todo.id)) {
      todos[i].value = todo.children[1].innerHTML;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Change (un)completed todo in LocalStorage
function completeLocalTodos(todo) {
  for (var i = 0; i < todos.length; i++)
    if (todos[i].id === parseFloat(todo.id)) {
      console.log(todos[i]);
      if (todos[i].class === "uncomplete") {
        todos[i].class = "completed";
      } else {
        todos[i].class = "uncomplete";
      }
    }

  localStorage.setItem("todos", JSON.stringify(todos));
}

//Modal + removing todos functions
function removeTodo(event) {
  var todoItems = document.querySelectorAll(".todo-item");
  switch (event.target.id) {
    case "all":
      modalWindow.style.display = "block";
      modalText.innerHTML = "Are you sure you want to delete all tasks ?";
      confirmBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modalWindow.style.display = "none";
        todoItems.forEach((todo) => {
          todo.parentNode.classList.add("fall");
          removeLocalTodos(todo.parentNode);
          todo.parentNode.addEventListener("transitionend", function () {
            todo.parentNode.remove();
          });
        });
      });
      cancelBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modalWindow.style.display = "none";
      });
      break;

    case "completed":
      modalWindow.style.display = "block";
      modalText.innerHTML =
        "Are you sure you want to delete all completed tasks ?";
      confirmBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modalWindow.style.display = "none";
        todoItems.forEach((todo) => {
          if (todo.parentNode.classList.contains("completed")) {
            todo.parentNode.classList.add("fall");
            removeLocalTodos(todo.parentNode);
            todo.parentNode.addEventListener("transitionend", function () {
              todo.parentNode.remove();
            });
          }
        });
      });
      cancelBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modalWindow.style.display = "none";
      });
      break;
  }
}
