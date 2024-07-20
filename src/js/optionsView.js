class OptionsView {
  addHandlerOptions() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-task-item--options");
      if (btn) {
        e.preventDefault();
        const popup = btn.closest(".task-item").querySelector(".menu-popup");
        popup.classList.toggle("hidden");
      } else {
        const popups = document.querySelectorAll(".menu-popup");
        popups.forEach((popup) => {
          popup.classList.add("hidden");
        });
      }

      const menuItem = e.target.closest(".menu-item");
      if (menuItem) {
        const taskItem = menuItem.closest(".task-item");
        this.handleMenuAction(menuItem, taskItem);
      }
    });
  }

  handleMenuAction(menuItem, taskItem) {
    const action = menuItem.dataset.action;

    switch (action) {
      case "complete":
        taskItem.classList.toggle("completed");
        this.updateButtonText(
          menuItem,
          taskItem.classList.contains("completed"),
        );
        this.saveTasksToStorage(); // Update storage after changing task state
        break;
      case "edit":
        this.showPopup(taskItem);
        break;
      case "delete":
        taskItem.remove();
        this.saveTasksToStorage(); // Update storage after deleting task
        break;
    }
  }

  showPopup(taskItem) {
    const editPopup = document.querySelector(".popupContainer");
    editPopup.classList.remove("hidden");

    // Clear the input field when the popup is shown
    const newTask = editPopup.querySelector(".edit-input");
    newTask.value = "";
    newTask.focus();

    const newEditBtn = editPopup.querySelector(".btn--edit");
    const clonedEditBtn = newEditBtn.cloneNode(true);
    newEditBtn.parentNode.replaceChild(clonedEditBtn, newEditBtn);

    const handleEdit = (e) => {
      e.preventDefault();
      if (newTask.value.trim() === "") {
        alert("Please Enter text before editing");
      } else {
        const oldTask = taskItem.querySelector(".task-text");
        oldTask.textContent = newTask.value;
        editPopup.classList.add("hidden");
        this.saveTasksToStorage(); // Update storage after editing task
      }
    };

    clonedEditBtn.addEventListener("click", handleEdit);

    const handleEnterPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (newTask.value.trim() === "") {
          alert("Please Enter text before editing");
        } else {
          const oldTask = taskItem.querySelector(".task-text");
          oldTask.textContent = newTask.value;
          editPopup.classList.add("hidden");
          this.saveTasksToStorage(); // Update storage after editing task
        }
        document.removeEventListener("keypress", handleEnterPress);
      }
    };

    document.addEventListener("keypress", handleEnterPress);

    editPopup.addEventListener(
      "click",
      (e) => {
        const closeBtn = e.target.closest(".closePopupBtn");
        if (closeBtn) {
          editPopup.classList.add("hidden");
        }
      },
      { once: true },
    );
  }

  updateButtonText(menuItem, isCompleted) {
    if (isCompleted) {
      menuItem.querySelector("h4").textContent = "Mark as pending";
    } else {
      menuItem.querySelector("h4").textContent = "Mark as completed";
    }
  }

  saveTasksToStorage() {
    const tasks = Array.from(document.querySelectorAll(".task-item")).map(
      (task) => ({
        text: task.querySelector(".task-text").textContent,
        isCompleted: task.classList.contains("completed"),
      }),
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

export default new OptionsView();
