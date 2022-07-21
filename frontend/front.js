var start_end = document.getElementById("start-end");

document.querySelector("#start-end").addEventListener("submit", function () {
  var start = start_end.start.value;
  var end = start_end.end.value;
  console.log("123456");
});

var task = document.getElementById("make-task");

document.querySelector("#new-task").addEventListener("click", function () {
  task.style.display = "block";
});
