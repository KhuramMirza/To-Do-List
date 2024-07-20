class ListView {
  _parentElement = document.querySelector(".task-list");
  _inputField = document.querySelector(".task-input");
  _addBtn = document.querySelector(".btn--add");

  constructor() {
    this._inputField.focus();
  }

  addHandlerTask(handler) {
    this._addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (this._inputField.value.trim() === "") return;
      handler(this._inputField.value.trim(), false);
      this._inputField.value = "";
    });

    this._inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (this._inputField.value.trim() === "") return;
        handler(this._inputField.value.trim(), false);
        this._inputField.value = "";
      }
    });
  }

  _addListTask(taskText, isCompleted) {
    const markup = this._generateMarkup(taskText, isCompleted);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup(taskText, isCompleted) {
    return `
      <li class="task-item ${isCompleted ? "completed" : ""}">
        <span class="task-text">${taskText}</span>
        <div class="menu-container">
          <button class="btn btn-task-item--options menu-button">
            <img src="../../src/img/task-list-options.svg" alt="Options">
          </button>
          <div class="menu-popup hidden">
            <button class="menu-item complete-btn" data-action="complete">
              <img src="../../src/img/check-circle.svg" alt="Completed">
              <h4>${isCompleted ? "Mark as pending" : "Mark as completed"}</h4>
            </button>
            <button class="menu-item edit-btn" id="open" data-action="edit">
              <img src="../../src/img/Edit.svg" alt="Edit">
              <h4>Edit Task</h4>
            </button>
            <button class="menu-item delete-btn" data-action="delete">
              <img src="../../src/img/trash.svg" alt="Delete">
              <h4>Delete Task</h4>
            </button>
          </div>
        </div>
      </li>
    `;
  }

  loadTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => this._addListTask(task.text, task.isCompleted));
  }
}

export default new ListView();
