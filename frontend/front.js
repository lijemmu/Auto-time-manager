var start_end = document.getElementById("start-end");

document.querySelector("#start-end").addEventListener("submit", function () {
  var start = start_end.start.value;
  var end = start_end.end.value;
});

var task = document.getElementById("make-task");

document.querySelector("#make-task").addEventListener("submit", function () {
  var activity = task.activity.value;
  var duration = task.duration.value;
  var time_preference = task.preference.value;
  console.log(activity);
});

document.querySelector("#new-task").addEventListener("click", function () {
  //display form

  task.style.display = "block";

  //save data
  var activity = "cook";
  var duration = "2.5";
  var preference = "in the morning";

  //makes a new div with the content

  var new_div = document.createElement("div");
  document.body.appendChild(new_div);
  new_div.class = "one-task";
  new_div.innerHTML =
    '<div class="one-task"><div class="upper"> <p>' +
    activity +
    '</p> <div class="duration-clock"> <p>' +
    duration +
    "h" +
    '</p> <img class="small-icon" src="images/clock.png" /></div></div><div class="lower"><p>' +
    "July 5th, " +
    preference +
    '</p><img class="small-icon" src="images/pencil.png" /></div></div>';

  task.style.display = "none";
});
