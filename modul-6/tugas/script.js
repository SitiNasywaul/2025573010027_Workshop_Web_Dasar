// script.js

const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const todoList = document.getElementById("todoList");
const error = document.getElementById("error");
const counter = document.getElementById("counter");
const clearDone = document.getElementById("clearDone");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

renderTodos();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    error.textContent = "Tugas tidak boleh kosong!";
    return;
  }

  if (text.length < 3) {
    error.textContent = "Minimal 3 karakter!";
    return;
  }

  if (text.length > 100) {
    error.textContent = "Maksimal 100 karakter!";
    return;
  }

  error.textContent = "";

  todos.push({
    id: Date.now(),
    text,
    completed: false,
    priority: priorityInput.value,
  });

  saveTodos();

  taskInput.value = "";

  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "done") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "done" : ""}`;
    li.draggable = true;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        
        <span class="todo-text">${todo.text}</span>

        <span class="priority ${todo.priority.toLowerCase()}">
          ${todo.priority}
        </span>
      </div>

      <button class="delete-btn">Hapus</button>
    `;

    const checkbox = li.querySelector("input");
    const deleteBtn = li.querySelector(".delete-btn");
    const textSpan = li.querySelector(".todo-text");

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    // EDIT TASK
    textSpan.addEventListener("dblclick", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = todo.text;
      input.className = "edit-input";

      textSpan.replaceWith(input);

      input.focus();

      function saveEdit() {
        const newText = input.value.trim();

        if (newText.length >= 3 && newText.length <= 100) {
          todo.text = newText;
          saveTodos();
          renderTodos();
        } else {
          renderTodos();
        }
      }

      input.addEventListener("blur", saveEdit);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });
    });

    // DRAG START
    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");

      const items = [...todoList.querySelectorAll(".todo-item")];

      const newTodos = [];

      items.forEach((item) => {
        const id = Number(item.dataset.id);
        const found = todos.find((t) => t.id === id);
        newTodos.push(found);
      });

      todos = newTodos;
      saveTodos();
    });

    todoList.appendChild(li);
  });

  updateCounter();
}

todoList.addEventListener("dragover", (e) => {
  e.preventDefault();

  const draggingItem = document.querySelector(".dragging");

  const siblings = [...todoList.querySelectorAll(".todo-item:not(.dragging)")];

  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  todoList.insertBefore(draggingItem, nextSibling);
});

function updateCounter() {
  const remaining = todos.filter((todo) => !todo.completed).length;
  counter.textContent = `${remaining} tugas tersisa`;
}

clearDone.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    currentFilter = btn.dataset.filter;

    renderTodos();
  });
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
