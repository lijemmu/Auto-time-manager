// import {userToken, calendarSchedule} from "./login.mjs"

// console.log("userToken:")
// console.log(userToken)

// console.log("calendarSchedule:")
// console.log(calendarSchedule)

// console.log(userToken)
// console.log(calendarSchedule)

// // code from login.js
// let userData;
// let loginForm = document.getElementById('initial-input');
// console.log(loginForm)
// if(loginForm){
//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         chrome.identity.getAuthToken({interactive: true}, function(token) {
//         // console.log(token);
//         userToken = token

//         // console.log(loginForm.elements['user-date'])
//         console.log('Here')

//         let time = (new Date('7-22-22')) // mm-dd-yyyy   yyyy-mm-dd
//         console.log(time)
//         let timeMax = new Date(new Date(time).getTime() + 60 * 60 * 24 * 1000).toISOString();
//         let timeMin = (new Date()).toISOString() 
    
    
//         let readyTimeMin = encodeURIComponent(time.toISOString())
//         let readyTimeMax = encodeURIComponent(timeMax)
    
//         let init = {
//             method: 'GET',
//             async: true,
//             headers: {
//                 Authorization: 'Bearer ' + token,
//                 'Content-Type': 'application/json'
//             },
//             'contentType': 'json'
//             };
//             fetch(
//                 'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin='+readyTimeMin+'&timeMax='+readyTimeMax+'&key=AIzaSyAwg3OYqKMlMeTlBDE7WgU3zzOnVZxrV1o',
//                 init
//             ).then((response) => response.json()
//             ).then(function(data) {
//             //   console.log(readyTimeMin)
//             //   console.log(readyTimeMax)
//             //   console.log(data)
                
//                 userData = data
//                 console.log('User data, from login.js:')
//                 console.log(userData)
//             }).then(()=>{
//                 setTimeout(()=>{window.location.href = "popup.html";}, 5000);
//             });
    
//             // generate(data)
            
           
//         });
//     });
// };
// console.log('userData:')
// console.log(userData)

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

// function: send tasks user created to Flask app, generate schedule, and post it to user's Google calendar
function generate(data){

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  fetch('https://atm-back-end-api.herokuapp.com/api', requestOptions)
      .then(async response => {
          const data = await response.json()
          // console.log(data)
          create_events(data)
      });

}


// ***********************************************************************
//
//                       HELPER FUNCTIONS
//
// ***********************************************************************


// extracts time in the 'HH:MM' format from a datetime string
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


// creates calendar events from a list of events retrieved from the backend
function create_events(events){

  for (const [key, value] of Object.entries(events)) {
      // console.log(key, value)
      const event = {
                      "end": {
                          "dateTime": value[0]
                      },
                      "start": {
                          "dateTime": value[1]
                      },
                      "summary": key,
                      "colorId": value[3]

                  }
      // console.log(JSON.stringify(event))
      post_event(event)
      // console.log("sent"+key)
      
  }
}

// 0: "2022-07-20T22:10:00-04:00"
// 1: "2022-07-20T20:10:00-04:00"


// posts a calendar event (represented in JSON) to the user's Google Calendar
function post_event(event){
  const requestOptions = {
      method: 'POST',
      headers: { 
          Authorization: 'Bearer ' + userToken,
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(event)
  };
  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyAwg3OYqKMlMeTlBDE7WgU3zzOnVZxrV1o', requestOptions)
      .then(async response => {
          const data = await response.json()
          console.log(data)
          return data
      });
}


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
