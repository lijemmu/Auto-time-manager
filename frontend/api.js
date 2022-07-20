// first step: grab calendar data from API concerning the events already in the user's calendar for the day



// function: format data from user's calendar into JSON to send to Flask app
function extractSchedule(calendarEvents){
    let theSchedule = {}

    for(let i=0; i<calendarEvents.length; i++){
        let task = calendarEvents[i]

        let taskName = task.summary

        let startTime = extractTime(task.start.dateTime)
        let endTime = extractTime(task.end.dateTime)

        theSchedule[taskName] = {
            start: startTime,
            end: endTime
        }

    }

    return theSchedule
}

// helper function that extracts time in the 'HH:MM' format from a datetime string
function extractTime(datetime){
    let dateOptions = {
        minimumIntegerDigits: 2,
        useGrouping: false
    }

    let theDate = new Date(datetime)
    let theHour = theDate.getHours().toLocaleString('en-us', dateOptions)
    let theMinutes = theDate.getMinutes().toLocaleString('en-us', dateOptions)

    return `${theHour}:${theMinutes}`
}


// function (triggered by button): send the data to Flask app


// get the response from the Flask app, which should hopefully be JSON formatted in the same way


// post the data to the calendar API to update the user's calendar


// maybe alert the user on the frontend that the task was successful (or if there was an error)