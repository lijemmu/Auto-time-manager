var start_end = document.getElementById("start-end");

document.querySelector("#start-end").addEventListener("submit", function (e) {
  e.preventDefault();
  var start = start_end.start.value;
  var end = start_end.end.value;
  console.log("123456");
});

var task = document.getElementById("make-task");

document.querySelector("#new-task").addEventListener("click", function (e) {
  e.preventDefault();
  task.style.display = "block";
});
