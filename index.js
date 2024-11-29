const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');


const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");

openModal.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", () => {
    modal.close();
})


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
    let dayOfMonth = dayjs().date();
    let month = dayjs().month();
    month = monthsArray[month];
    let year = dayjs().year();
    
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