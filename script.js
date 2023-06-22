document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("add-button");
    var taskInput = document.getElementById("task-input");
    var taskList = document.getElementById("task-list");
    var clearButton = document.getElementById("clear-button");
    var saveButton = document.getElementById("save-button");
    var loadButton = document.getElementById("load-button");
  
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    taskList.addEventListener("click", function(event) {
      if (event.target.tagName === "INPUT") {
        var checkbox = event.target;
        var listItem = checkbox.parentNode;
  
        if (checkbox.checked) {
          listItem.classList.add("completed");
        } else {
          listItem.classList.remove("completed");
        }
      }
    });
  
    clearButton.addEventListener("click", function() {
      var completedItems = taskList.querySelectorAll(".completed");
      completedItems.forEach(function(item) {
        item.remove();
      });
    });
  
    saveButton.addEventListener("click", function() {
      var tasks = [];
      var taskItems = taskList.querySelectorAll("li");
  
      taskItems.forEach(function(item) {
        var taskText = item.querySelector("label").textContent;
        var taskCompleted = item.querySelector("input").checked;
  
        tasks.push({
          text: taskText,
          completed: taskCompleted
        });
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
      alert("Task list saved successfully!");
    });
  
    loadButton.addEventListener("click", function() {
      var savedTasks = localStorage.getItem("tasks");
  
      if (savedTasks) {
        var tasks = JSON.parse(savedTasks);
  
        taskList.innerHTML = "";
        tasks.forEach(function(task) {
          var taskItem = document.createElement("li");
          var taskCheckbox = document.createElement("input");
          taskCheckbox.setAttribute("type", "checkbox");
          taskCheckbox.checked = task.completed;
  
          var taskLabel = document.createElement("label");
          taskLabel.textContent = task.text;
  
          taskItem.appendChild(taskCheckbox);
          taskItem.appendChild(taskLabel);
          taskList.appendChild(taskItem);
        });
  
        alert("Task list loaded successfully!");
      } else {
        alert("No saved task list found.");
      }
    });
  
    function addTask() {
      var taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        var taskItem = document.createElement("li");
        var taskCheckbox = document.createElement("input");
        taskCheckbox.setAttribute("type", "checkbox");
  
        var taskLabel = document.createElement("label");
        taskLabel.textContent = taskText;
  
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskList.appendChild(taskItem);
  
        taskInput.value = "";
      }
    }
  });
  