// import necessary modules and plugins
const dayjs = require ('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

// get HTML elements
const elTimezone = document.getElementById("timezone");
const elTime = document.getElementById("time");
const elDate = document.getElementById("date");
const elWeekday = document.getElementById("weekday");

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
const timezoneContainer = document.getElementById("timezone-select");


const monthsArray = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const weekArray = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const timezoneList = Intl.supportedValuesOf('timeZone');

// add all timezones to the timezone-select element
for (let i of timezoneList) {
    let option = document.createElement('option');
    option.setAttribute("value", i);
    option.textContent = i;
    timezoneContainer.appendChild(option);
}

// event handlers
window.addEventListener("load", () => {
    dataHandler.getData();
    dataHandler.displayData();
})

openModal.addEventListener("click", () => modal.showModal());

closeModal.addEventListener("click", (e) => {
    modal.close();
    dataHandler.changeTimezone();
});


// functionality for getting, formatting, displaying and updating data 
let dataHandler = {
    timezone: '',
    time: '',
    weekday: '',
    date: '',
    getData: function() {
        this.timezone = this.getTimezone();
        this.time = this.getTime();
        this.weekday = this.getWeekday();
        this.date = this.getDate();
    },
    getTimezone: function() {
        let userTimezone = dayjs.tz.guess()
        return userTimezone;
    },
    getTime: function() {
        let hours = String(dayjs().hour());
        let minutes = String(dayjs().minute());
        let seconds = String(dayjs().second());

        const obj = {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }

        return obj;
    },
    getWeekday: function() {
        let dayOfWeek = dayjs().day();
        dayOfWeek = weekArray[dayOfWeek];
    
        let userWeekday = dayOfWeek;
        return userWeekday;
    },
    getDate: function() {
        let dayOfMonth = String(dayjs().date());
        let monthNumber = dayjs().month();
        let month = monthsArray[monthNumber];
        let year = dayjs().year();

        const obj = {
            day: dayOfMonth,
            month: month,
            year: year
        }

        return obj;
    },
    displayData: function() {
        elTimezone.textContent = this.formatTimezone(this.timezone);
        elTime.textContent = this.formatTime(this.time);
        elDate.textContent = this.formatDate(this.date);
        elWeekday.textContent = this.weekday;
    },
    formatTimezone: function(tz) {
        tz = tz.replace("_", " ");
        tz = tz.replace("/", " - ");
        return tz;
    },
    formatTime: function(obj) {
        let {hours, minutes, seconds} = obj;

        let timeArray = [hours, minutes, seconds];
        for (let i in timeArray) {
            if (timeArray[i].length < 2) {
                timeArray[i] = `0${timeArray[i]}`;
            }
        }
        hours = timeArray[0];
        minutes = timeArray[1];
        seconds = timeArray[2];

        return `${hours}:${minutes}:${seconds}`;
    },
    formatDate: function(obj) {
        let {day, month, year} = obj;

        if (day.length < 2) {
            day = `0${day}`;
        }
        return `${month} ${day}, ${year}`;
    },
    changeTimezone: function() {
        let selectedTz = timezoneContainer.value;
        this.updateData(selectedTz);
    },
    updateData: function(tz) {
        let dayjsObj = dayjs().tz(tz);

        let timeObj = {
            hours: String(dayjsObj.$H),
            minutes: String(dayjsObj.$m),
            seconds: String(dayjsObj.$s)
        }

        let dateObj = {
            day: String(dayjsObj.$D),
            month: monthsArray[dayjsObj.$M],
            year: dayjsObj.$y
        }

        this.timezone = tz;
        this.time = timeObj;
        this.date = dateObj;
        this.weekday = weekArray[dayjsObj.$W];

        this.displayData(); 
    }
}
