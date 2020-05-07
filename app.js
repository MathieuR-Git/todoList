//Initializing my todos
var todos;

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");
var todos;

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", emptyInput);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

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

function addTodo() {
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn", "fas", "fa-check");
  todoDiv.appendChild(completedButton);

  //Delete mark button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn", "fas", "fa-trash");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //Add Todo to localStorage
  let todoItem = { value: todoInput.value, class: "uncomplete" };
  saveLocalTodos(todoItem);

  // Clear input value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentNode;

  //Delete todo
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
    completeLocalTodos(todo);
  }
}

function filterTodo(e) {
  const eachTodo = todoList.childNodes;

  eachTodo.forEach(todo => {
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

function getTodos() {
  //check localstorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add(todo.class);

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn", "fas", "fa-check");
    todoDiv.appendChild(completedButton);

    //Delete mark button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn", "fas", "fa-trash");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todoIndex = todo.children[0].innerText;
  for (var i = 0; i < todos.length; i++)
    if (todos[i].value === todoIndex) {
      todos.splice(i, 1);
    }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function completeLocalTodos(todo) {
  let todoIndex = todo.children[0].innerText;
  for (var i = 0; i < todos.length; i++)
    if (todos[i].value === todoIndex) {
      if (todos[i].class === "uncompleted") {
        todos[i].class = "completed";
      } else {
        todos[i].class = "uncompleted";
      }
    }

  localStorage.setItem("todos", JSON.stringify(todos));
}
