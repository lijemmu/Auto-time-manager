let tokenClient;
let gapiInited = false;
let gisInited = false;

let userData;
let userToken;
// Auth


// Dummy Data

//   # recieved data
let startTime = '08:00'
let endTime = '23:00'
let margin = 10

let year = 2022
let month = 7
let day = 20

let sch = {
    "bio": {
        "start": '10:00',
        "end": '11:00'
    },
    "lunch": {
        "start": '13:00',
        "end": '14:00'
    },
    "meeting": {
        "start": '15:00',
        "end": '15:45'
    },
    "CS250": {
        "start": '16:00',
        "end": '17:15'
    },
    "dinner": {
        "start": '19:00',
        "end": '20:00'
    }
}

//   # a dict that would get sent from user
let task = {
    "run": [30, "m"],
    "read": [15, "m"],
    "work on project": [30],
    "study": [45],
    "Do Hw": [120],
    "laundary": [40],
    "test": [15]
}


// let data = {
//     "startTime": startTime,
//     "endTime": endTime,
//     "margin": margin,
//     "year": year,
//     "month": month,
//     "day": day,
//     "sch": sch,
//     "task": task
// }





window.onload = function() {
    let loginButton = document.getElementById('login')
    console.log(loginButton)
    loginButton.addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        // console.log(token);
        userToken = token

        let time = (new Date("7-22-22"))
        let timeMax = new Date(new Date(time).getTime() + 60 * 60 * 24 * 1000).toISOString();
        let timeMin = (new Date()).toISOString() 


        let readyTimeMin = encodeURIComponent(timeMin)
        let readyTimeMax = encodeURIComponent(timeMax)

        let init = {
            method: 'GET',
            async: true,
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            'contentType': 'json'
          };
          fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin='+readyTimeMin+'&timeMax='+readyTimeMax+'&key=AIzaSyAwg3OYqKMlMeTlBDE7WgU3zzOnVZxrV1o',
            init)
            .then((response) => response.json())
            .then(function(data) {
            //   console.log(readyTimeMin)
            //   console.log(readyTimeMax)
            //   console.log(data)
              
              userData = data
              console.log(userData)
            })
            // .then(()=>window.location.href = "popup.html");

            // generate(data)
            
            
      });
    });
  };





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




export {userToken, userData as calendarSchedule}