// first step: grab calendar data from API concerning the events already in the user's calendar for the day
function getCalendarData() {
  // use get method from calendar object; requires authorization (OAuth?)
  return;
}

// function: format data from user's calendar into JSON to send to Flask app
function extractSchedule(calendarEvents) {
  let theSchedule = {};

  for (let i = 0; i < calendarEvents.length; i++) {
    let task = calendarEvents[i];

    let taskName = task.summary;

    let startTime = extractTime(task.start.dateTime);
    let endTime = extractTime(task.end.dateTime);

    theSchedule[taskName] = {
      start: startTime,
      end: endTime,
    };
  }

  return theSchedule;
}

// helper function that extracts time in the 'HH:MM' format from a datetime string
function extractTime(datetime) {
  let dateOptions = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };

  let theDate = new Date(datetime);
  let theHour = theDate.getHours().toLocaleString("en-us", dateOptions);
  let theMinutes = theDate.getMinutes().toLocaleString("en-us", dateOptions);

  return `${theHour}:${theMinutes}`;
}

// function (triggered by button): send the data to Flask app

// get the response from the Flask app, which should hopefully be JSON formatted to input directly into Google calendar

// post the data to the calendar API to update the user's calendar
function postToCalendar(schedule) {
  // will need the calendar ID and some authorization (OAuth?)
  return;
}

// maybe alert the user on the frontend that the task was successful (or if there was an error)

// Dummy data
// key = summary
// value = [endTime, startTime, TimeZone, colorID]
// {
//     'Do Hw': ['2022-07-20T22:10:00-04:00', '2022-07-20T20:10:00-04:00', 'America/New_York', '10'],
//     'laundary': ['2022-07-20T18:05:00-04:00', '2022-07-20T17:25:00-04:00', 'America/New_York', '10'],
//     'read': ['2022-07-20T09:05:00-04:00', '2022-07-20T08:50:00-04:00', 'America/New_York', '10'],
//     'run': ['2022-07-20T08:40:00-04:00', '2022-07-20T08:10:00-04:00', 'America/New_York', '10'],
//     'study': ['2022-07-20T14:55:00-04:00', '2022-07-20T14:10:00-04:00', 'America/New_York', '10'],
//     'test': ['2022-07-20T12:05:00-04:00', '2022-07-20T11:50:00-04:00', 'America/New_York', '10'],
//     'work on project': ['2022-07-20T11:40:00-04:00', '2022-07-20T11:10:00-04:00', 'America/New_York', '10']
// }

// do we go with plain JS or node.js for communicating with the Google Calendar API?
