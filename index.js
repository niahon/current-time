const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const elTimezone = document.getElementById("timezone");
const elTime = document.getElementById("time");
const elDate = document.getElementById("date");
const elWeekday = document.getElementById("weekday");

const monthsArray = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const weekArray = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

let dayOfMonth;
let month;
let monthNumber
let year;


window.addEventListener("load", () => {
    let user = getData();
    displayData(user.timezone, user.time, user.date, user.weekday);
})

function getData() {
    let user = {};
    user.timezone = getTimezone();
    user.time = getTime();
    user.weekday = getWeekday();
    user.date = getDate();

    return user;
}

function getTimezone() {
    let userTimezone = dayjs.tz.guess()
    userTimezone = userTimezone.replace("_", " ");
    userTimezone = userTimezone.replace("/", " - ");
    return userTimezone;
}

function getTime() {
    let hours = dayjs().hour();
    let minutes = dayjs().minute();
    let seconds = dayjs().second();

    if (String(seconds).length < 2) {
        seconds = `0${seconds}`;
    }
    if (String(minutes).length < 2) {
        minutes = `0${minutes}`;
    }
    if (String(hours).length < 2) {
        hours = `0${hours}`;
    }

    let userTime = `${hours}:${minutes}:${seconds}`;
    return userTime
}

function getWeekday() {
    let dayOfWeek = dayjs().day();
    dayOfWeek = weekArray[dayOfWeek];

    let userWeekday = dayOfWeek;
    return userWeekday;
}

function getDate() {
    dayOfMonth = dayjs().date();
    monthNumber = dayjs().month();
    month = monthNumber;
    month = monthsArray[month];
    year = dayjs().year();
    
    // add 0 if number has only 1 digit
   
    if (String(dayOfMonth).length < 2) {
        dayOfMonth = `0${dayOfMonth}`;
    }

    let userDate = `${month} ${dayOfMonth}, ${year}`;
    return userDate;
}

function displayData(tz, time, date, weekday) {
    elTimezone.textContent = tz;
    elTime.textContent = time;
    elDate.textContent = date;
    elWeekday.textContent = weekday;
}


const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
const timezoneContainer = document.getElementById("timezone-select");

const timezoneList = Intl.supportedValuesOf('timeZone');

for (i of timezoneList) {
    let option = document.createElement('option');
    option.setAttribute("value", i);
    option.textContent = i;
    timezoneContainer.appendChild(option);

}

openModal.addEventListener("click", () => modal.showModal());

closeModal.addEventListener("click", (e) => {
    modal.close();
    changeTimezone();
});

function changeTimezone() {
    currentTimezone = timezoneContainer.value;
    updateDisplay(currentTimezone);
}

function updateDisplay(tz) {
    let dateObj = dayjs(`${year}-${monthNumber + 1}-${dayOfMonth} ${elTime.textContent}`).tz(tz);
    let updatedYear = dateObj.$y;
    let updatedMonth = monthsArray[dateObj.$M];
    let updatedDay = dateObj.$D;

    let updatedHours = dateObj.$H;
    let updatedMinutes = dateObj.$m;
    let updatedSeconds = dateObj.$s;


    if (String(updatedDay).length < 2) {
        updatedDay = `0${updatedDay}`;
    }
    if (String(updatedSeconds).length < 2) {
        updatedSeconds = `0${updatedSeconds}`;
    }
    if (String(updatedHours).length < 2) {
        updatedHours = `0${updatedHours}`;
    }

    let updatedDate = `${updatedMonth} ${updatedDay}, ${updatedYear}`;
    let updatedTime = `${updatedHours}:${updatedMinutes}:${updatedSeconds}`;

    if (elTime.textContent != updatedTime) {
        console.log("foi");
        elTime.textContent = updatedTime;
    }
    
    if (elDate.textContent != updatedDate) {
        elDate.textContent = updatedDate;
    }

    elTimezone.textContent = tz;
}