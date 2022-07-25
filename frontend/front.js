
// adding tasks

var task = document.getElementById("make-task");

var tasksList = [];

function loadTasks() {
  if (!localStorage.tasksList) {
    return false;
  }

  var currentTasksList = JSON.parse(localStorage.tasksList);

  for (let i = 0; i < currentTasksList.length; i++) {
    //makes a new div with the content
    var tasks = document.getElementById("task-items-container");
    var new_div = document.createElement("div");
    tasks.appendChild(new_div);
    new_div.class = "one-task";
    //new_div.id = currentTasksList[i].id.toString();

    new_div.innerHTML =
      '<div class="one-task"><div class="upper"> <p class="task-activity">' +
      currentTasksList[i].activity +
      '</p> <div class="duration-clock"> <p class="task-duration">' +
      currentTasksList[i].duration +
      "h" +
      '</p> <img class="small-icon" src="images/clock.png" /></div></div><div class="lower"><p class="task-time">' +
      "July 5th, " +
      currentTasksList[i].preference +
      "</p></div></div>";

    if (tasks.childElementCount > currentTasksList.length) {
      for (n = 0; tasks.childElementCount - currentTasksList.length; n++) {
        tasks.removeChild(tasks.firstChild);
      }
    }
  }
}

document
  .querySelector("#make-task")
  .addEventListener("submit", function (event) {
    if (!localStorage.tasksList) {
      return false;
    }

    tasksList = JSON.parse(localStorage.tasksList);

    //   var randomID = Math.random().toString(16).slice(2);

    var oneTask = {
      activity: document.getElementById("activity").value,
      duration: document.getElementById("duration").value,
      preference: document.getElementById("preference").value,
      date: "July 5th",
    };

    tasksList[tasksList.length] = oneTask;
    localStorage.tasksList = JSON.stringify(tasksList);
    loadTasks();
    task.style.display = "none";
    event.preventDefault();
    return false;
  });

var timeAvailable = document.getElementById("num-hours-left")
function subtractFromTimeAvailable(taskDuration){
  currentTimeLeft = parseFloat(timeAvailable.innerText)
  currentTimeLeft -= taskDuration
  currentTimeLeft = Math.round(currentTimeLeft * 10) / 10
  timeAvailable.innerText = currentTimeLeft
}

document.querySelector("#new-task").addEventListener("click", function () {
  loadTasks();
  task.style.display = "block";
});



window.onload = function () {
  console.log("User data, from front.js:");
  console.log(userData);
  loadTasks();
};
