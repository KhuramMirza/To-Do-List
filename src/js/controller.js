import listView from "./addTaskView.js";
import optionsView from "./optionsView.js";
import { mode } from "./changeMode.js";

const addTask = function (taskText, isCompleted) {
  listView._addListTask(taskText, isCompleted);
  optionsView.saveTasksToStorage(); // Save tasks to storage after adding a task
};

const init = function () {
  listView.addHandlerTask(addTask);
  listView.loadTasksFromStorage();
  optionsView.addHandlerOptions();
  mode();
};

init();
