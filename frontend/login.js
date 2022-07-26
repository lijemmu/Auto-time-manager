// let tokenClient;
// let gapiInited = false;
// let gisInited = false;

let userData;
// let userToken;
// export {
//     userToken,
//     userData as calendarSchedule
// };
// // Auth


// Dummy Data

//   # recieved data
let startTime = '08:00'
let endTime = '23:00'
let margin = 10

let year = 2022
let month = 7
let day = 20

// let sch = {
//     "bio": {
//         "start": '10:00',
//         "end": '11:00'
//     },
//     "lunch": {
//         "start": '13:00',
//         "end": '14:00'
//     },
//     "meeting": {
//         "start": '15:00',
//         "end": '15:45'
//     },
//     "CS250": {
//         "start": '16:00',
//         "end": '17:15'
//     },
//     "dinner": {
//         "start": '19:00',
//         "end": '20:00'
//     }
// }

//   # a dict that would get sent from user
// let task = {
//     "run": [30, "m"],
//     "read": [15, "m"],
//     "work on project": [30],
//     "study": [45],
//     "Do Hw": [120],
//     "laundary": [40],
//     "test": [15]
// }


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






let loginForm = document.getElementById('initial-input')
console.log(loginForm)
if(loginForm){
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        chrome.identity.getAuthToken({interactive: true}, function(token) {
        // console.log(token);
        userToken = token

        // console.log(loginForm.elements['user-date'])
        console.log('Here')

        let time = (new Date('7-22-22')) // mm-dd-yyyy   yyyy-mm-dd
        console.log(time)
        let timeMax = new Date(new Date(time).getTime() + 60 * 60 * 24 * 1000).toISOString();
        let timeMin = (new Date()).toISOString() 
    
    
        let readyTimeMin = encodeURIComponent(time.toISOString())
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
                init
            ).then((response) => response.json()
            ).then(function(data) {
            //   console.log(readyTimeMin)
            //   console.log(readyTimeMax)
            //   console.log(data)
                
                userData = data
                console.log('User data, from login.js:')
                console.log(userData)
            }).then(()=>{
                setTimeout(()=>{window.location.href = "popup.html";}, 5000);
            });
    
            // generate(data)
            
           
        });
    });
};

