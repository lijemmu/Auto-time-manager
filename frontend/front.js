var start_end = document.getElementById("start-end");

document
  .querySelector("#start-end")
  .addEventListener("submit", function (event) {
    var start = start_end.start.value;
    var end = start_end.end.value;
    console.log(start);
    console.log(end);
    event.preventDefault();
  });

// adding tasks

var task = document.getElementById("make-task");

document
  .querySelector("#make-task")
  .addEventListener("submit", function (event) {
    var activity = task.activity.value;
    var duration = task.duration.value;
    var preference = task.preference.value;

    //makes a new div with the content
    var tasks = document.getElementById("task-items-container");
    var new_div = document.createElement("div");
    tasks.appendChild(new_div);
    new_div.class = "one-task";
    new_div.innerHTML =
      '<div class="one-task"><div class="upper"> <p class="task-activity">' +
      activity +
      '</p> <div class="duration-clock"> <p class="task-duration">' +
      duration +
      "h" +
      '</p> <img class="small-icon" src="images/clock.png" /></div></div><div class="lower"><p class="task-time">' +
      "July 5th, " +
      preference +
      '</p><img class="small-icon" src="images/pencil.png" /></div></div>';

    //hides the form
    task.style.display = "none";

    event.preventDefault();
  });

document.querySelector("#new-task").addEventListener("click", function () {
  //display form

  task.style.display = "block";
});



// Auth

window.onload = function() {
  document.getElementById('auth').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
    });
  });
};