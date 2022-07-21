var start_end = document.getElementById("start-end");
start_end.addEventListener("submit", function (event) {
  var start = start_end.start.value;
  var end = start_end.end.value;
  console.log(start);
  console.log(end);
  event.preventDefault();
});

// adding tasks
var taskItemsContainer = document.getElementById("task-items-container")
var tasksList = [];
function loadTasks() {
  if (!localStorage.tasksList) {
    return false;
  }

  var currentTasksList = JSON.parse(localStorage.tasksList);

  for (i = 0; i < currentTasksList.length; i++) {
    //makes a new div with the content
    var aTask = document.createElement("div");
    aTask.className = "one-task";
    aTask.innerHTML =
      '<div class="upper"> <p class="task-activity">' +
      currentTasksList[i].activity +
      '</p> <div class="duration-clock"> <p class="task-duration">' +
      currentTasksList[i].duration +
      "h" +
      '</p> <img class="small-icon" src="images/clock.png" /></div></div><div class="lower"><p class="task-time">' +
      "July 5th, " +
      currentTasksList[i].preference +
      '</p><img class="small-icon" src="images/pencil.png" /></div>';
    taskItemsContainer.appendChild(aTask);
    
    subtractFromTimeAvailable(parseFloat(currentTasksList[i].duration))

    // if (taskItemsContainer.childElementCount > currentTasksList.length) {
    //   for (n = 0; taskItemsContainer.childElementCount - currentTasksList.length; n++) {
    //     taskItemsContainer.removeChild(taskItemsContainer.firstChild);
    //   }
    // }
  }
}

var task = document.getElementById("make-task");
task.addEventListener("submit", function (event) {
  var oneTask = {
    activity: document.getElementById("activity").value,
    duration: document.getElementById("duration").value,
    preference: document.getElementById("preference").value,
    date: "July 5th",
  };

  tasksList.push(oneTask);
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
  task.style.display = "block";
});



// Auth

window.onload = function() {
  document.getElementById('auth').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
    });
  });
  loadTasks();
};
