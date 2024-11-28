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

let hours = dayjs().hour();
let minutes = dayjs().minute();
let seconds = dayjs().second();

let dayOfWeek = (dayjs().day());
dayOfWeek = weekArray[dayOfWeek];
let dayOfMonth = dayjs().date();
let month = dayjs().month();
month = monthsArray[month];
let year = dayjs().year();

// add 0 if number has only 1 digit
if (String(seconds).length < 2) {
    seconds = `0${seconds}`;
}
if (String(minutes).length < 2) {
    minutes = `0${minutes}`;
}
if (String(hours).length < 2) {
    hours = `0${hours}`;
}
if (String(dayOfMonth).length < 2) {
    dayOfMonth = `0${dayOfMonth}`;
}

let userTimezone = dayjs.tz.guess()
userTimezone = userTimezone.replace("_", " ");
userTimezone = userTimezone.replace("/", " - ");
let userTime = `${hours}:${minutes}:${seconds}`;
let userWeekday = dayOfWeek;
let userDate = `${month} ${dayOfMonth}, ${year}`;

elTimezone.textContent = userTimezone;
elTime.textContent = userTime;
elDate.textContent = userDate;
elWeekday.textContent = userWeekday;
